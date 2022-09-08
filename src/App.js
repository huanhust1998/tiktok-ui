import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/component/Layout";
import { Fragment } from "react"; //component này chỉ để chứa và không sinh ra thẻ thật ở trong DOM

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'next-common-lib';

const LIMITED_SEARCH_TEXT_LENGHT = 30;

export const WordHighLighter = React.forwardRef(({ text, highlightText, styles, componentType, onClick }, ref) => {
    let customStyle = styles;
    let htmlText = text;

    if (typeof customStyle !== 'object' || customStyle === null) customStyle = {};
    if (typeof highlightText === 'string') highlightText = [highlightText];

    if (highlightText === []) {
        renderNoHighLight();
    }

    /**
     * html 하이라이팅된 html 추출하는 함수
     * @param {string} htmlText html 원본
     * @param {string} keyword 하이라이팅 하려는 키워드
     * @returns {string} 하이라이팅 완료된 html
     */
    const makeHtmlText = (htmlText, keyword) => {
        let result = '';
        const rexTxt = keyword.split('').join('([-s]?)');
        const regExp = new RegExp('(' + rexTxt + ')', 'g');
        result = htmlText.replace(regExp, '<span style="color: #f45743">$1</span>');
        return result;
    };

    for (let i = 0; i < highlightText.length; i++) {
        if (highlightText[i].length > LIMITED_SEARCH_TEXT_LENGHT) {
            // if the string keyword over limited length
            console.log(LIMITED_SEARCH_TEXT_LENGHT, '개 까지만 가능');
            renderNoHighLight();
        } else if (highlightText[i].length > 1 && /^[^<a-z>]+$/.test(highlightText[i])) {
            // if the string keyword has no characters
            let keyword = highlightText[i];
            if (keyword.indexOf('+') == 0) {
                keyword = keyword.slice(1);
            }
            htmlText = makeHtmlText(htmlText, keyword);
            // 0을 제거하여 검색하는 이유는 전화번호 일때만이므로 '-'를 추가해서 붙여서 한번 더 검색함
            if (keyword.length > 1 && keyword.indexOf('0') === 0 && text.indexOf('0') !== 0) {
                htmlText = makeHtmlText(htmlText, `-${keyword.substr(1)}`);
            }
        } else {
            // if the string keyword has characters
            let regExp = new RegExp('(' + highlightText[i] + ')', 'i');
            if (htmlText.match(regExp)) {
                htmlText = htmlText.replace(regExp, '<span style="color: #f45743">$1</span>');
            }
        }
    }

    switch (componentType) {
        case 'span':
            return (
                <span
                    ref={ref}
                    className="text"
                    style={{ ...customStyle }}
                    dangerouslySetInnerHTML={{ __html: htmlText }}
                ></span>
            );
        case 'link':
            return (
                <Button
                    onClick={onClick}
                    componentType="link"
                    label={<span dangerouslySetInnerHTML={{ __html: htmlText }}></span>}
                    size="sm"
                    title={text}
                />
            );
        default:
            return null;
    }

    function renderNoHighLight() {
        switch (componentType) {
            case 'span':
                return (
                    <span ref={ref} className="text" style={{ ...customStyle }}>
            {text}
          </span>
                );
            case 'link':
                return <Button onClick={onClick} componentType="link" label={text} size="sm" title={text} />;
            default:
                return null;
        }
    }
});

WordHighLighter.propTypes = {
    text: PropTypes.string,
    highlightText: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    componentType: PropTypes.string,
};

WordHighLighter.defaultProps = {
    text: '',
    highlightText: [],
    styles: {},
    componentType: 'span',
};

