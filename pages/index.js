import Head from "next/head";
import Landing from "../components/landing";
import Game from "../components/game";

export default function Home(props) {
  return (
    <div className="container">
      {props.authUser ? (
        <Game user={props.user} userLoading={props.userLoading} />
      ) : (
        <Landing />
      )}
    </div>
  );
}
