import "../styles/TagsCell.css";

interface IProps {
  tag: string;
}
const TagCell = ({ tag }: IProps) => <span className="tag">{tag}</span>;

export default TagCell;
