// Icons are bundled as native Android drawable resources (copied into
// android/app/src/main/res/drawable/ic_<name>.xml). This makes the native
// `Icon` component load them from the APK instantly via the `android.resource`
// scheme, instead of fetching each XML over HTTP from Metro on first render
// (which caused the visible pop-in/delay on CatCard and the icon pickers).
//
// The drawable resource name is passed as `{ uri: "ic_<name>" }` (no scheme);
// the native IconView.resolveUri detects the missing scheme and resolves it
// via ResourceIdHelper.getResourceUri -> android.resource://<pkg>/drawable/ic_<name>.

export type IconName =
  | "add"
  | "edit"
  | "remove"
  | "info"
  | "directions_car"
  | "flight"
  | "local_atm"
  | "house"
  | "local_bar"
  | "local_cafe"
  | "local_dining"
  | "local_gas_station"
  | "grocery"
  | "local_hospital"
  | "local_mall"
  | "local_parking"
  | "local_pharmacy"
  | "local_pizza"
  | "local_shipping"
  | "local_taxi"
  | "medical_services"
  | "money"
  | "money_bag"
  | "payments"
  | "receipt"
  | "receipt_long"
  | "redeem"
  | "savings"
  | "school"
  | "shopping_bag"
  | "shopping_basket"
  | "shopping_cart"
  | "sports_basketball"
  | "sports_soccer"
  | "two_wheeler"
  | "wallet"
  | "work"
  | "restaurant"
  | "fastfood"
  | "movie"
  | "music_note"
  | "sports_esports"
  | "sports_football"
  | "sports_tennis"
  | "fitness_center"
  | "spa"
  | "child_care"
  | "pets"
  | "hotel"
  | "beach_access"
  | "park"
  | "train"
  | "directions_bus"
  | "check";

const ICON_NAMES: IconName[] = [
  "add",
  "edit",
  "remove",
  "info",
  "directions_car",
  "flight",
  "local_atm",
  "house",
  "local_bar",
  "local_cafe",
  "local_dining",
  "local_gas_station",
  "grocery",
  "local_hospital",
  "local_mall",
  "local_parking",
  "local_pharmacy",
  "local_pizza",
  "local_shipping",
  "local_taxi",
  "medical_services",
  "money",
  "money_bag",
  "payments",
  "receipt",
  "receipt_long",
  "redeem",
  "savings",
  "school",
  "shopping_bag",
  "shopping_basket",
  "shopping_cart",
  "sports_basketball",
  "sports_soccer",
  "two_wheeler",
  "wallet",
  "work",
  "restaurant",
  "fastfood",
  "movie",
  "music_note",
  "sports_esports",
  "sports_football",
  "sports_tennis",
  "fitness_center",
  "spa",
  "child_care",
  "pets",
  "hotel",
  "beach_access",
  "park",
  "train",
  "directions_bus",
  "check",
];

// Map of icon name -> native drawable resource name (ic_<name>).
const ICON_NAME_TO_DRAWABLE: Record<IconName, string> = {
  add: "ic_add",
  edit: "ic_edit",
  remove: "ic_remove",
  info: "ic_info",
  directions_car: "ic_directions_car",
  flight: "ic_flight",
  local_atm: "ic_local_atm",
  house: "ic_house",
  local_bar: "ic_local_bar",
  local_cafe: "ic_local_cafe",
  local_dining: "ic_local_dining",
  local_gas_station: "ic_local_gas_station",
  grocery: "ic_grocery",
  local_hospital: "ic_local_hospital",
  local_mall: "ic_local_mall",
  local_parking: "ic_local_parking",
  local_pharmacy: "ic_local_pharmacy",
  local_pizza: "ic_local_pizza",
  local_shipping: "ic_local_shipping",
  local_taxi: "ic_local_taxi",
  medical_services: "ic_medical_services",
  money: "ic_money",
  money_bag: "ic_money_bag",
  payments: "ic_payments",
  receipt: "ic_receipt",
  receipt_long: "ic_receipt_long",
  redeem: "ic_redeem",
  savings: "ic_savings",
  school: "ic_school",
  shopping_bag: "ic_shopping_bag",
  shopping_basket: "ic_shopping_basket",
  shopping_cart: "ic_shopping_cart",
  sports_basketball: "ic_sports_basketball",
  sports_soccer: "ic_sports_soccer",
  two_wheeler: "ic_two_wheeler",
  wallet: "ic_wallet",
  work: "ic_work",
  restaurant: "ic_restaurant",
  fastfood: "ic_fastfood",
  movie: "ic_movie",
  music_note: "ic_music_note",
  sports_esports: "ic_sports_esports",
  sports_football: "ic_sports_football",
  sports_tennis: "ic_sports_tennis",
  fitness_center: "ic_fitness_center",
  spa: "ic_spa",
  child_care: "ic_child_care",
  pets: "ic_pets",
  hotel: "ic_hotel",
  beach_access: "ic_beach_access",
  park: "ic_park",
  train: "ic_train",
  directions_bus: "ic_directions_bus",
  check: "ic_check",
};

function isIconName(value: string): value is IconName {
  return Object.prototype.hasOwnProperty.call(ICON_NAME_TO_DRAWABLE, value);
}

// Source object shape accepted by the native `Icon` component's `source` prop
// (ImageSourcePropType). Passing `{ uri: "ic_<name>" }` with no scheme makes the
// native layer resolve it to the bundled drawable resource.
export type IconSource = { uri: string };

// Returns the Icon `source` for the given icon name. Falls back to `check` when
// the name is unknown, and warns in dev so typos surface without crashing.
export function getIconSource(name: string): IconSource {
  if (isIconName(name)) {
    return { uri: ICON_NAME_TO_DRAWABLE[name] };
  }
  if (__DEV__) {
    console.warn(
      `[icons] Unknown icon name "${name}". Falling back to "check". ` +
        `Valid names: ${ICON_NAMES.join(", ")}`,
    );
  }
  return { uri: ICON_NAME_TO_DRAWABLE.check };
}

export const ICON_MAP: Record<IconName, IconSource> = ICON_NAMES.reduce(
  (acc, name) => {
    acc[name] = { uri: ICON_NAME_TO_DRAWABLE[name] };
    return acc;
  },
  {} as Record<IconName, IconSource>,
);

export { ICON_NAMES };
