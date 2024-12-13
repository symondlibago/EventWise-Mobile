import { supabase } from "../../../../config/supabaseConfig";
import { Alert } from "react-native";
export const testSupabaseConnectivity = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error("Error listing buckets:", error);
      Alert.alert("Supabase Error", "Unable to list storage buckets.");
    } else {
      console.log("Buckets:", data);
      Alert.alert(
        "Supabase Success",
        `Buckets: ${data.map((bucket) => bucket.name).join(", ")}`
      );
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    Alert.alert("Unexpected Error", "An unexpected error occurred.");
  }
};
