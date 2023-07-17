
export default function Conditional({ renderCondition, children }) {
    if (renderCondition) {
        return children;
    } else {
        return null;
    }
}