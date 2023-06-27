declare namespace Game {
  type Card = {
    id: string;
    image: string;
    title: string;
    ref: ActorRef<any, any>;
  };
}
