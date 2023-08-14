import main_menu from "../configs/main_menu.json" assert { type: "json" };

type Config = {
  type: string;
  id: string;
};

const configs: Config[] = [...Object.values(main_menu)];

export function getConfig(type: string, id: string): Config {
  const config = configs.find(
    (config) => config.type === type && config.id === id
  );

  if (!config) throw new Error(`Config not found type=${type} and id=${id}`);
  return config;
}
