"use server";

import { revalidatePath } from "next/cache";

const API_URL = "https://api.example.com/products"; // Ganti dengan URL API Anda


export async function createProduct(formData: FormData) {
  const name = formData.get("name");
  const price = formData.get("price");
  const description = formData.get("description");

 
  if (!name || !price) {
    return { error: "Nama dan harga produk wajib diisi." };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal menambahkan produk ke API");
    }

    
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Terjadi kesalahan" };
  }
}


export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Gagal menghapus produk dari API");
    }

    
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Terjadi kesalahan" };
  }
}