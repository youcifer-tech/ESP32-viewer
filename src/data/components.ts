export interface ComponentInfo {
  id: string;
  title: string;
  description: string;
  specs?: string[];
}

export const componentData: Record<string, ComponentInfo> = {
  "ESP32_Chip": {
    id: "ESP32Wroom001_1",
    title: "ESP-WROOM-32 Module",
    description: "The core microcontroller module featuring the ESP32 chip. It handles Wi-Fi and Bluetooth connectivity and executes the main application logic.",
    specs: ["Dual-core Xtensa 32-bit LX6 microprocessor", "Clock frequency up to 240 MHz", "520 KB internal SRAM"]
  },
  "Antenna": {
    id: "ESP32Wroom001_9",
    title: "PCB Trace Antenna",
    description: "Built-in antenna for 2.4 GHz Wi-Fi and Bluetooth communication.",
    specs: ["2.4 GHz ISM band", "Gain: ~2 dBi"]
  },
  "Red_LED": {
    id: "ESP32Wroom001_20",
    title: "Power Indicator (Red LED)",
    description: "Indicates whether the board is receiving power.",
    specs: ["Always on when powered"]
  },
  "Blue_LED": {
    id: "ESP32Wroom001_24",
    title: "User Configurable (Blue LED)",
    description: "A built-in LED connected to a GPIO pin (usually GPIO 2) that can be controlled via code.",
    specs: ["Connected to GPIO 2"]
  },
  "Button": {
    id: "ESP32Wroom001_5",
    title: "Onboard Button",
    description: "Hardware button used to reset the board or put it into flashing mode.",
    specs: ["Active Low", "Internal Pull-up"]
  },
  "Pins": {
    id: "ESP32Wroom001_7",
    title: "GPIO Pin Headers",
    description: "General Purpose Input/Output pins providing interfaces for sensors, displays, PWM, ADC, I2C, SPI, and UART.",
    specs: ["3.3V Logic Level", "Multiple multiplexed functions per pin"]
  }
};
