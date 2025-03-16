"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function EventForm({ params }: { params: { id: string } }) {
  const isEditing = params.id !== "new"
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    image_url: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        // If editing, fetch event data
        if (isEditing && params.id !== "new") {
          const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single()

          if (error) {
            throw error
          }

          if (event) {
            // Format dates for input fields (YYYY-MM-DD)
            const formatDateForInput = (dateString: string) => {
              const date = new Date(dateString)
              return date.toISOString().split('T')[0]
            }

            setFormData({
              title: event.title || "",
              description: event.description || "",
              start_date: formatDateForInput(event.start_date),
              end_date: formatDateForInput(event.end_date),
              location: event.location || "",
              image_url: event.image_url || "",
            })

            if (event.image_url) {
              setImagePreview(event.image_url)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isEditing, params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      return formData.image_url
    }

    const fileExt = imageFile.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `events/${fileName}`

    const { error: uploadError } = await supabase.storage.from("images").upload(filePath, imageFile)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // Validate form
      if (!formData.title || !formData.start_date) {
        throw new Error("Title and start date are required fields")
      }

      // Upload image if provided
      let imageUrl = formData.image_url
      if (imageFile) {
        imageUrl = await uploadImage()
      }

      const eventData = {
        ...formData,
        image_url: imageUrl,
      }

      if (isEditing) {
        // Update existing event
        const { error } = await supabase.from("events").update(eventData).eq("id", params.id)

        if (error) throw error
      } else {
        // Create new event
        const { error } = await supabase.from("events").insert([eventData])

        if (error) throw error
      }

      // Redirect back to events list
      router.push("/admin/events")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving event:", error)
      setError(error.message || "Failed to save event. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!isEditing) return

    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    setIsSaving(true)

    try {
      const { error } = await supabase.from("events").delete().eq("id", params.id)

      if (error) throw error

      router.push("/admin/events")
      router.refresh()
    } catch (error: any) {
      console.error("Error deleting event:", error)
      setError(error.message || "Failed to delete event. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

