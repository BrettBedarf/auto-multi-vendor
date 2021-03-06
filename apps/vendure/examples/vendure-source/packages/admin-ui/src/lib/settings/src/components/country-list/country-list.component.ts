import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    DataService,
    DeletionResult,
    GetCountryList,
    GetZones,
    LanguageCode,
    ModalService,
    NotificationService,
    ServerConfigService,
    Zone,
} from '@vendure/admin-ui/core';
import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'vdr-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent implements OnInit, OnDestroy {
    searchTerm = new FormControl('');
    countriesWithZones$: Observable<Array<GetCountryList.Items & { zones: GetZones.Zones[] }>>;
    zones$: Observable<GetZones.Zones[]>;
    availableLanguages$: Observable<LanguageCode[]>;
    contentLanguage$: Observable<LanguageCode>;

    private countries: GetCountryList.Items[] = [];
    private destroy$ = new Subject<void>();
    private refresh$ = new Subject<void>();

    constructor(
        private dataService: DataService,
        private notificationService: NotificationService,
        private modalService: ModalService,
        private serverConfigService: ServerConfigService,
    ) {}

    ngOnInit() {
        this.contentLanguage$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.contentLanguage);

        const countries$ = combineLatest(
            this.contentLanguage$,
            this.searchTerm.valueChanges.pipe(startWith(null)),
        ).pipe(
            map(([__, term]) => term),
            switchMap(term => this.dataService.settings.getCountries(999, 0, term).single$),
            tap(data => {
                this.countries = data.countries.items;
            }),
            map(data => data.countries.items),
        );

        this.zones$ = this.dataService.settings.getZones().mapStream(data => data.zones);

        this.countriesWithZones$ = combineLatest(countries$, this.zones$).pipe(
            map(([countries, zones]) => {
                return countries.map(country => ({
                    ...country,
                    zones: zones.filter(z => !!z.members.find(c => c.id === country.id)),
                }));
            }),
        );

        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
    }

    ngOnDestroy() {
        this.destroy$.next(undefined);
        this.destroy$.complete();
    }

    setLanguage(code: LanguageCode) {
        this.dataService.client.setContentLanguage(code).subscribe();
    }

    deleteCountry(countryId: string) {
        this.modalService
            .dialog({
                title: _('catalog.confirm-delete-country'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response =>
                    response ? this.dataService.settings.deleteCountry(countryId) : EMPTY,
                ),
            )
            .subscribe(
                response => {
                    if (response.deleteCountry.result === DeletionResult.DELETED) {
                        this.notificationService.success(_('common.notify-delete-success'), {
                            entity: 'Country',
                        });
                        this.dataService.settings.getCountries(999, 0).single$.subscribe();
                    } else {
                        this.notificationService.error(response.deleteCountry.message || '');
                    }
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Country',
                    });
                },
            );
    }

    private isZone(input: Zone.Fragment | { name: string } | string): input is Zone.Fragment {
        return input.hasOwnProperty('id');
    }
}
