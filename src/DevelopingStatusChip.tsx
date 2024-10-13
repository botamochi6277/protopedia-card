import { Chip } from "@mui/material";
// icons
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const DevelopingStatusChip = (props: { status: number }) => {
  const status = props.status - 1;

  // （1:アイデア, 2:開発中, 3:完成, 4:供養）
  const chips = [
    <Chip label="Idea" icon={<EmojiObjectsIcon />} color="info" size="small" />,
    <Chip
      label="Developing"
      icon={<ConstructionIcon />}
      color="warning"
      size="small"
    />,
    <Chip
      label="Completed"
      icon={<CheckCircleIcon />}
      color="success"
      size="small"
    />,
    <Chip
      label="Memorial"
      icon={<ArchiveIcon />}
      color="secondary"
      size="small"
    />,
  ];

  return chips[status];
};

export default DevelopingStatusChip;
