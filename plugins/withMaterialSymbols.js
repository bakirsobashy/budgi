const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Icon names that the app renders through @expo/ui's Icon component as native
// Android drawable resources. They must live in android/app/src/main/res/drawable
// with the `ic_` prefix so the native IconView can resolve them.
// Keep this list in sync with src/lib/icons.ts.
const ICON_NAMES = [
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

module.exports = function withMaterialSymbols(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const platformRoot = config.modRequest.platformProjectRoot;

      const drawableDir = path.join(platformRoot, 'app/src/main/res/drawable');
      fs.mkdirSync(drawableDir, { recursive: true });

      const sourceDir = path.join(projectRoot, 'node_modules/@expo/material-symbols/icons');

      for (const name of ICON_NAMES) {
        const sourcePath = path.join(sourceDir, `${name}.xml`);
        const destPath = path.join(drawableDir, `ic_${name}.xml`);
        fs.copyFileSync(sourcePath, destPath);
      }

      return config;
    },
  ]);
};
