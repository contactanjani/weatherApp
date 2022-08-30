class Weather {
  private _city: string = '';
  private _temperature: number = 0;
  private _humidity: number = 0;
  private _visibility: number = 0;
  private _weatherDescription: string = '';

  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }

  get temperature(): number {
    return this._temperature;
  }
  set temperature(value: number) {
    this._temperature = value;
  }

  get humidity(): number {
    return this._humidity;
  }
  set humidity(value: number) {
    this._humidity = value;
  }

  public get visibility(): number {
    return this._visibility;
  }
  public set visibility(value: number) {
    this._visibility = value;
  }

  public get weatherDescription(): string {
    return this._weatherDescription;
  }
  public set weatherDescription(value: string) {
    this._weatherDescription = value;
  }

  constructor(data: any) {
    this.city = data.name;
    this.temperature = data.main.temp;
    this.humidity = data.main.humidity;
    this.visibility = data.visibility;
    this.weatherDescription = data.weather[0].description;
  }
}

export {Weather};
