"use client";

import { useForm } from "@/contexts/form-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import type React from "react";
import Image from "next/image";

export function AttendeeDetails() {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.avatarUrl && !selectedFile) {
      newErrors.avatarUrl = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let uploadedImageUrl = formData.avatarUrl;
    if (selectedFile) {
      uploadedImageUrl = (await uploadToCloudinary()) || formData.avatarUrl;
    }

    updateFormData({
      avatarUrl: uploadedImageUrl,
      step: 3,
    });
  };

  return (
    <div className=" w-full max-w-[700px] p-6 lg:p-12 mx-auto h-full bg-[#041E23] border border-[#0E464F] rounded-[40px]">
      <div className="mb-8 w-full">
        <h1 className="text-3xl font-serif mb-2 text-white">
          Attendee Details
        </h1>
        <div className="h-1 w-[60%] bg-teal-500"></div>
        <span className="text-gray-400 text-sm mt-2 block">Step 2/3</span>
      </div>

      <Card className="bg-[#002626] border-teal-900/20 p-6 flex flex-col gap-8">
        <div className="main-upload-card">
          <Label className="text-sm font-medium text-gray-300">
            Upload Profile Photo
          </Label>
          <div className="h-[200px] w-full bg-[#00000032] flex ">
            <div className="upload-card text-center -mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {/* <Upload className="w-8 h-8 text-teal-500 mb-2" />
                 */}
                <Image width={32} height={32} alt="download icon" src="/cloud-download.png" />
                <span className="text-gray-300">
                  Drag & drop or click to upload
                </span>
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-full h-32 object-cover  mx-auto"
                />
              )}
              {errors.avatarUrl && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.avatarUrl}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className=" border-t-4 border-t-[#07373F] pt-8">
          <Label htmlFor="fullName" className="text-gray-300">
            Enter your name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            placeholder="Lagos Avi"
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="bg-[#002626] text-white rounded-[12px] border-[#07373F]"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="email" className="text-gray-300">
            Enter your email*
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            placeholder="hello@avioflagos.io"
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-[#002626] text-white rounded-[12px] border-[#07373F]"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="specialRequest" className="text-gray-300">
            Special request?
          </Label>
          <Textarea
            id="specialRequest"
            value={formData.specialRequest}
            onChange={(e) => updateFormData({ specialRequest: e.target.value })}
            className="bg-[#002626] border-[#07373F] rounded-[12px] text-white"
            placeholder="Enter any special requests here..."
          />
        </div>

        <div className="flex gap-6 w-full justify-between pt-4">
          <Button
            variant="outline"
            className="border-[#24A0B5] rounded-[8px] text-[#24A0B5] hover:bg-teal-900/20 flex-1"
            onClick={() => updateFormData({ step: 1 })}
          >
            Back
          </Button>
          <Button
            className="bg-[#24A0B5] rounded-[8px] hover:bg-teal-600 flex-1 text-white"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
