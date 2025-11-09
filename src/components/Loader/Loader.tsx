import style from "./Loader.module.css";
import { FadeLoader} from "react-spinners"

export default function Loader() {
  return <div className={style.backdrop}><FadeLoader /></div>;
}
