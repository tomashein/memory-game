declare namespace App {
  type MachineContext = {
    data: App.Content[];
    user: string | undefined;
    theme: string | undefined;
  };
  type Content = {
    id: string;
    title: string;
    image: string;
  };
  interface HttpError {
    code: number;
    message: string;
    name: string;
  }
}
