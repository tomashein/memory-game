declare namespace Load {
  type MachineContext = {
    data: App.Content[];
    error: App.HttpError | undefined;
  };
}
