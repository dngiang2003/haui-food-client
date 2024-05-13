import classNames from "classnames/bind";

import styles from "./NotFoundLayout.module.scss";

const cx = classNames.bind(styles);

function NotFoundLayout({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default NotFoundLayout;
