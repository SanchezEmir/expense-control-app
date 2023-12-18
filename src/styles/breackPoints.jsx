const Sizes = {
    mobile: "570px",
    tablet: "768px",
    laptop: "992px",
    desktop: "1200px"
};

export const Device = {
    mobile: `(min-width: ${Sizes.mobile})`,
    tablet: `(min-width: ${Sizes.tablet})`,
    laptop: `(min-width: ${Sizes.laptop})`,
    desktop: `(min-width: ${Sizes.desktop})`
};
