import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./GoToTop.module.scss";

import { ArrowDownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!isVisible && window.scrollY > window.innerHeight) {
        setIsVisible(true);
      }
      if (isVisible && window.scrollY <= window.innerHeight) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isVisible]);

  return (
    <div className={cx("go-top", isVisible && "go-top--show")} onClick={scrollToTop}>
      <ArrowDownIcon className={cx("go-top__icon")} />
    </div>
  );
}

export default GoToTop;
