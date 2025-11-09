import GridItem from "../GridItem/GridItem";
import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onImageClick: (photo: Photo) => void;
}

export default function PhotosGalleryItem({ photo, onImageClick }: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}
        onClick={() => onImageClick(photo)}
      >
        <img src={photo.src.large} alt={photo.alt} />
      </div>
    </GridItem>
  );
}
