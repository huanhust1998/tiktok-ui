<<<<<<< HEAD:src/component/Layout/components/Header/index.js
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={images.logo} alt="Tiktok" />
                </div>
                <div className={cx("search")}>
                    <input
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                    />
                    <button className={cx("clear")}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className={cx("loading")}
                    />
                    <button className={cx("search-btn")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx("actions")}></div>
            </div>
        </header>
    );
=======
import React from "react";

function Header(props) {
    return <div>Header</div>;
>>>>>>> parent of 68def78 (add header):src/component/Layout/DefaultLayout/Header/index.js
}

export default Header;
