const is_dev_env = (): boolean => {
    return import.meta.env.VITE_REACT_APP_WORKING_ENV === "Production";
  };

  export const get_base_url = (): string | undefined => {
    return is_dev_env() ? "" : import.meta.env.VITE_REACT_APP_BACKEND_API;
  };
