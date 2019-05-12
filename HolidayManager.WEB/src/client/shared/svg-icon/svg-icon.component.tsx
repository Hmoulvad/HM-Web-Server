import * as React from "react";

export interface ISvgIconProps {
    iconName: string;
    className?: string;
}

const SvgIcon: React.FC<ISvgIconProps> = (props) => {
    const { iconName, className = "" } = props;

    try {
        const svg = require(`../../../assets/svg/${iconName}.svg`);
        return <span className={`svg-icon ${className} `} dangerouslySetInnerHTML={{ __html: svg }}/>;
    } catch (e) {
        console.error(e);
    }
    return <React.Fragment />;
};

export default SvgIcon;
