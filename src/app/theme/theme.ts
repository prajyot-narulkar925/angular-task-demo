export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {

    "--background-default": "#8bbee8",
    "--background-secondary": "#A3B9CC",
    "--background-tertiary": "#5C7D99",
    "--background-light": "#000000",

    "--primary-background-card": "#ffefff",
    "--primary-header-card": "#ede5ff",
    "--primary-card-item": "#e0b0c9",

    "--primary-btn-color": "#77a9df",
    "--primary-color-link":"#0071ff",

    "--secondary-btn-color":"#b9dde5",
    
    "--background-tertiary-shadow": "0 20px 50px rgba(0,0,0,.3)"
  }
};

export const dark: Theme = {
  name: "dark",
  properties: {

    "--background-default": "#797C80",
    "--background-secondary": "#41474D",
    "--background-tertiary": "#08090A",
    "--background-light": "#FFFFFF",

    "--primary-background-card": "#5DFDCB",
    "--primary-header-card": "#24B286",
    "--primary-card-item": "#498472",
    "--primary-btn-color": "#19a74b",

    "--primary-color-link":"#385880",
    "--secondary-btn-color":"#77bbcc",

    "--background-tertiary-shadow": "0 20px 50px rgba(255,255,255,.3)"
  }
};