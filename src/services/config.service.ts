export interface ConfigValues {
  colNum: number;
  rowNum: number;
}

export class ConfigService {
  private static readonly defaultValues: ConfigValues = {
    colNum: 7,
    rowNum: 5,
  };

  public static save(values: ConfigValues) {
    window.localStorage.setItem('config', JSON.stringify(values));
  }

  public static load() {
    const values = window.localStorage.getItem('config');
    return values != null ? JSON.parse(values) as ConfigValues : ConfigService.defaultValues;
  }
}
