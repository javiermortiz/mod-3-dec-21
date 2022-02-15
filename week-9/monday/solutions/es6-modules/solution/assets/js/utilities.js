//!!ADD
// const getIndex = () => {
//!!END_ADD
//!!START SILENT
const getIndex = () => {
//!!END
    const wrapper = document.getElementById('wrapper');
    return parseInt(wrapper.dataset.index);
};

export default getIndex;