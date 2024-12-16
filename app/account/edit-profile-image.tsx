"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming Dialog components from your UI library
import { handleUpload } from "@/lib/utils";
import setCanvasPreview from "@/set-canvas-preview";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { ChangeEvent, useContext, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../auth-provider";
import { queryClient } from "../query-client-provider";

const ASPECT_RATIO = 4 / 4;
const MIN_DIMENSION = 150;

const EditProfileImage = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const { user } = useContext(AuthContext);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Flex
          align="center"
          justify="center"
          className="absolute bottom-2 right-2 cursor-pointer w-10 h-10 rounded-full bg-gray-200 border"
        >
          <PencilIcon className="text-sm" />
        </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            <div className="block mb-3 w-fit">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                className="outline-none focus:outline-none"
                onChange={onSelectFile}
              />
            </div>
            {imgSrc && (
              <div className="flex flex-col items-center relative">
                <ReactCrop
                  crop={crop}
                  onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  circularCrop
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: "70vh" }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
            )}
            {crop && (
              <canvas
                ref={previewCanvasRef}
                className="mt-4"
                style={{
                  display: "none",
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading || !imgSrc}
            onClick={async () => {
              setLoading(true);
              if (imgRef.current && previewCanvasRef.current && crop) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = previewCanvasRef.current.toDataURL();

                const downloadURL = await handleUpload(dataUrl);
                axios
                  .put(`/api/user/?id=${user.id}`, {
                    image: downloadURL,
                  })
                  .then(() => {
                    setLoading(false);
                    queryClient.invalidateQueries({ queryKey: ["auth-user"] });
                    setOpen(false);
                  });
              }
            }}
          >
            {loading ? <BeatLoader /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileImage;
