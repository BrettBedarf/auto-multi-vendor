// tslint:disable

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AddFulfillmentToOrderResult": [
      "Fulfillment",
      "EmptyOrderLineSelectionError",
      "ItemsAlreadyFulfilledError",
      "InsufficientStockOnHandError",
      "InvalidFulfillmentHandlerError",
      "FulfillmentStateTransitionError",
      "CreateFulfillmentError"
    ],
    "AddManualPaymentToOrderResult": [
      "Order",
      "ManualPaymentStateError"
    ],
    "AuthenticationResult": [
      "CurrentUser",
      "InvalidCredentialsError"
    ],
    "CancelOrderResult": [
      "Order",
      "EmptyOrderLineSelectionError",
      "QuantityTooGreatError",
      "MultipleOrderError",
      "CancelActiveOrderError",
      "OrderStateTransitionError"
    ],
    "CreateAssetResult": [
      "Asset",
      "MimeTypeError"
    ],
    "CreateChannelResult": [
      "Channel",
      "LanguageNotAvailableError"
    ],
    "CreateCustomerResult": [
      "Customer",
      "EmailAddressConflictError"
    ],
    "CreatePromotionResult": [
      "Promotion",
      "MissingConditionsError"
    ],
    "CustomField": [
      "BooleanCustomFieldConfig",
      "DateTimeCustomFieldConfig",
      "FloatCustomFieldConfig",
      "IntCustomFieldConfig",
      "LocaleStringCustomFieldConfig",
      "RelationCustomFieldConfig",
      "StringCustomFieldConfig",
      "TextCustomFieldConfig"
    ],
    "CustomFieldConfig": [
      "StringCustomFieldConfig",
      "LocaleStringCustomFieldConfig",
      "IntCustomFieldConfig",
      "FloatCustomFieldConfig",
      "BooleanCustomFieldConfig",
      "DateTimeCustomFieldConfig",
      "RelationCustomFieldConfig",
      "TextCustomFieldConfig"
    ],
    "ErrorResult": [
      "AlreadyRefundedError",
      "CancelActiveOrderError",
      "ChannelDefaultLanguageError",
      "CouponCodeExpiredError",
      "CouponCodeInvalidError",
      "CouponCodeLimitError",
      "CreateFulfillmentError",
      "EmailAddressConflictError",
      "EmptyOrderLineSelectionError",
      "FulfillmentStateTransitionError",
      "InsufficientStockError",
      "InsufficientStockOnHandError",
      "InvalidCredentialsError",
      "InvalidFulfillmentHandlerError",
      "ItemsAlreadyFulfilledError",
      "LanguageNotAvailableError",
      "ManualPaymentStateError",
      "MimeTypeError",
      "MissingConditionsError",
      "MultipleOrderError",
      "NativeAuthStrategyError",
      "NegativeQuantityError",
      "NoChangesSpecifiedError",
      "NothingToRefundError",
      "OrderLimitError",
      "OrderModificationStateError",
      "OrderStateTransitionError",
      "PaymentMethodMissingError",
      "PaymentOrderMismatchError",
      "PaymentStateTransitionError",
      "ProductOptionInUseError",
      "QuantityTooGreatError",
      "RefundOrderStateError",
      "RefundPaymentIdMissingError",
      "RefundStateTransitionError",
      "SettlePaymentError"
    ],
    "ModifyOrderResult": [
      "Order",
      "NoChangesSpecifiedError",
      "OrderModificationStateError",
      "PaymentMethodMissingError",
      "RefundPaymentIdMissingError",
      "OrderLimitError",
      "NegativeQuantityError",
      "InsufficientStockError",
      "CouponCodeExpiredError",
      "CouponCodeInvalidError",
      "CouponCodeLimitError"
    ],
    "NativeAuthenticationResult": [
      "CurrentUser",
      "InvalidCredentialsError",
      "NativeAuthStrategyError"
    ],
    "Node": [
      "Address",
      "Administrator",
      "Allocation",
      "Asset",
      "AuthenticationMethod",
      "Cancellation",
      "Channel",
      "Collection",
      "Country",
      "Customer",
      "CustomerGroup",
      "Facet",
      "FacetValue",
      "Fulfillment",
      "HistoryEntry",
      "Job",
      "Order",
      "OrderItem",
      "OrderLine",
      "OrderModification",
      "Payment",
      "PaymentMethod",
      "Product",
      "ProductOption",
      "ProductOptionGroup",
      "ProductVariant",
      "Promotion",
      "Refund",
      "Release",
      "Return",
      "Role",
      "Sale",
      "ShippingMethod",
      "StockAdjustment",
      "Surcharge",
      "Tag",
      "TaxCategory",
      "TaxRate",
      "User",
      "Zone"
    ],
    "PaginatedList": [
      "AdministratorList",
      "AssetList",
      "CollectionList",
      "CountryList",
      "CustomerGroupList",
      "CustomerList",
      "FacetList",
      "HistoryEntryList",
      "JobList",
      "OrderList",
      "PaymentMethodList",
      "ProductList",
      "ProductVariantList",
      "PromotionList",
      "RoleList",
      "ShippingMethodList",
      "TagList",
      "TaxRateList"
    ],
    "RefundOrderResult": [
      "Refund",
      "QuantityTooGreatError",
      "NothingToRefundError",
      "OrderStateTransitionError",
      "MultipleOrderError",
      "PaymentOrderMismatchError",
      "RefundOrderStateError",
      "AlreadyRefundedError",
      "RefundStateTransitionError"
    ],
    "RemoveOptionGroupFromProductResult": [
      "Product",
      "ProductOptionInUseError"
    ],
    "SearchResultPrice": [
      "PriceRange",
      "SinglePrice"
    ],
    "SettlePaymentResult": [
      "Payment",
      "SettlePaymentError",
      "PaymentStateTransitionError",
      "OrderStateTransitionError"
    ],
    "SettleRefundResult": [
      "Refund",
      "RefundStateTransitionError"
    ],
    "StockMovement": [
      "Allocation",
      "Cancellation",
      "Release",
      "Return",
      "Sale",
      "StockAdjustment"
    ],
    "StockMovementItem": [
      "StockAdjustment",
      "Allocation",
      "Sale",
      "Cancellation",
      "Return",
      "Release"
    ],
    "TransitionFulfillmentToStateResult": [
      "Fulfillment",
      "FulfillmentStateTransitionError"
    ],
    "TransitionOrderToStateResult": [
      "Order",
      "OrderStateTransitionError"
    ],
    "TransitionPaymentToStateResult": [
      "Payment",
      "PaymentStateTransitionError"
    ],
    "UpdateChannelResult": [
      "Channel",
      "LanguageNotAvailableError"
    ],
    "UpdateCustomerResult": [
      "Customer",
      "EmailAddressConflictError"
    ],
    "UpdateGlobalSettingsResult": [
      "GlobalSettings",
      "ChannelDefaultLanguageError"
    ],
    "UpdatePromotionResult": [
      "Promotion",
      "MissingConditionsError"
    ]
  }
};
      export default result;
    