from pydantic import BaseModel

class MobilePriceModel(BaseModel):
    battery_power: int
    clock_speed: float
    fc: int
    int_memory: int
    n_cores: int
    pc: int
    ram: int
    talk_time: int