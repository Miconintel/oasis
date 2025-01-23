import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // VERY BAD BUG
  // const imageName = hasImagePath
  //   ? newCabin.image
  //   : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select()
  //   .single();

  let query = supabase.from("cabins");

  // create if Id is absent
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit if id present
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // then get data
  const { data, error } = await query.select().single();

  // handle error
  if (error) {
    console.error(error);
    throw new Error("cabin could not be created");
  }

  // upload image
  // if there is no new image file selected, then just return data.
  // since it is still the same image that will be there

  if (hasImagePath) return data;

  // else continue with uploading image

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not uploaded"
    );
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }

  return data;
}
