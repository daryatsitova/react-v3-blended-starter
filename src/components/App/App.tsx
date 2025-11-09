import { useState } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import { getPhotos } from "../../services/photos";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const fetchedPhotos = await getPhotos(query);
      setPhotos(fetchedPhotos);
    } catch {
      setIsError(true);
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit}/>
          {isLoading && <Loader />}
          {isError && (
            <Text textAlign="center" marginBottom="20">
              Something went wrong. Please try again.
            </Text>
          )}
          {photos.length > 0 && <PhotosGallery photos={photos} onImageClick={handleImageClick} />}
        </Container>
      </Section>

      {selectedPhoto && (
        <Modal photo={selectedPhoto} onClose={handleCloseModal} />
      )}
    </>
  );
}
