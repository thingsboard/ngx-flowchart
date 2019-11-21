/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var regex = /(auto|scroll)/;
/** @type {?} */
var style = (/**
 * @param {?} node
 * @param {?} prop
 * @return {?}
 */
function (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
});
var ɵ0 = style;
/** @type {?} */
var scroll = (/**
 * @param {?} node
 * @return {?}
 */
function (node) {
    return regex.test(style(node, 'overflow') +
        style(node, 'overflow-y') +
        style(node, 'overflow-x'));
});
var ɵ1 = scroll;
/** @type {?} */
var scrollparent = (/**
 * @param {?} node
 * @return {?}
 */
function (node) {
    return !node || node === document.body
        ? document.body
        : scroll(node)
            ? node
            : scrollparent((/** @type {?} */ (node.parentNode)));
});
var ɵ2 = scrollparent;
export default scrollparent;
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFyZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZsb3djaGFydC8iLCJzb3VyY2VzIjpbImxpYi9zY3JvbGxwYXJlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFBTSxLQUFLLEdBQUcsZUFBZTs7SUFFdkIsS0FBSzs7Ozs7QUFBRyxVQUFDLElBQWEsRUFBRSxJQUFZO0lBQ3hDLE9BQUEsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztBQUFuRCxDQUFtRCxDQUFBOzs7SUFFL0MsTUFBTTs7OztBQUFHLFVBQUMsSUFBYTtJQUMzQixPQUFBLEtBQUssQ0FBQyxJQUFJLENBQ1IsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7UUFDdkIsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUM7UUFDekIsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUg1QixDQUc0QixDQUFBOzs7SUFFeEIsWUFBWTs7OztBQUFHLFVBQUMsSUFBaUI7SUFDckMsT0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUk7UUFDN0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJO1FBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxZQUFZLENBQUMsbUJBQUEsSUFBSSxDQUFDLFVBQVUsRUFBZSxDQUFDO0FBSmhELENBSWdELENBQUE7O0FBRWxELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG5cbmNvbnN0IHN0eWxlID0gKG5vZGU6IEVsZW1lbnQsIHByb3A6IHN0cmluZyk6IHN0cmluZyA9PlxuICBnZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XG5cbmNvbnN0IHNjcm9sbCA9IChub2RlOiBFbGVtZW50KSA9PlxuICByZWdleC50ZXN0KFxuICAgIHN0eWxlKG5vZGUsICdvdmVyZmxvdycpICtcbiAgICBzdHlsZShub2RlLCAnb3ZlcmZsb3cteScpICtcbiAgICBzdHlsZShub2RlLCAnb3ZlcmZsb3cteCcpKTtcblxuY29uc3Qgc2Nyb2xscGFyZW50ID0gKG5vZGU6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgPT5cbiAgIW5vZGUgfHwgbm9kZSA9PT0gZG9jdW1lbnQuYm9keVxuICAgID8gZG9jdW1lbnQuYm9keVxuICAgIDogc2Nyb2xsKG5vZGUpXG4gICAgPyBub2RlXG4gICAgOiBzY3JvbGxwYXJlbnQobm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KTtcblxuZXhwb3J0IGRlZmF1bHQgc2Nyb2xscGFyZW50O1xuIl19