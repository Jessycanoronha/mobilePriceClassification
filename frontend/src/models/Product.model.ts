export type IntMemory = 2 | 4 | 8 | 16 | 32 | 64;
export type NCore = 1 | 2 | 4 | 6 | 8;

export interface ProductData {
  battery_power: number;
  clock_speed: number;
  fc: number;
  int_memory: IntMemory;
  n_cores: NCore;
  pc: number;
  ram: number;
  talk_time: number;
}