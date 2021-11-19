import styles from "./layout.module.css";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-block", marginTop: "-30px" }}>
          {props?.user?.displayName ? (
            `👋  ${props?.user?.displayName}`
          ) : (
            <Link href="/login" passHref>
              <Button variant="contained">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
      {props.children}
    </div>
  );
}
