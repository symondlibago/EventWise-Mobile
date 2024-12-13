import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  modalOverlay: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    // alignItems: "center", // Removed to allow full-width components
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  stepIndicator: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  customizePromptContainer: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  customizePromptText: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
  coverPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coverPhoto: {
    width: 250,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    backgroundColor: "#e1e4e8",
  },
  addPhotoText: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "bold",
  },
  inputStyle: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  datePicker: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 16,
  },
  serviceName: {
    fontSize: 16,
    color: "#333",
  },
  totalPriceContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  packageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  packageItemSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#e6f0ff",
  },
  packageImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: "cover",
    marginRight: 10,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  packagePrice: {
    fontSize: 14,
    color: "#555",
  },
  packageDescription: {
    fontSize: 14,
    color: "#777",
  },
  noPackagesText: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
  customizeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  customizeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  serviceButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  guestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
export default styles;
