import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {
    fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
} from '../../../services/authServices';
import { Picker } from '@react-native-picker/picker'; // For status selection
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native'; // Add this import

const EquipmentSP = ({ route }) => {
    const navigation = useNavigation(); // Add useNavigation hook
    const { eventId } = route.params;
    const [equipment, setEquipment] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newTotal, setNewTotal] = useState('');
    const [newSorted, setNewSorted] = useState('');
    const [newStatus, setNewStatus] = useState('Complete');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadEquipment = async () => {
            setLoading(true);
            try {
                const data = await fetchEquipment(eventId);
                setEquipment(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to load equipment.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadEquipment();
    }, [eventId]);

    const handleAdd = async () => {
        if (newItem.trim() && newTotal.trim()) {
            const item = {
                event_id: eventId,
                item_name: newItem.trim(),
                total_items: parseInt(newTotal, 10),
                sorted_items: parseInt(newSorted, 10) || 0,
                status: newStatus,
            };
            setSaving(true);
            try {
                const addedItem = await addEquipment(item);
                setEquipment((prev) => [...prev, addedItem]);
                setNewItem('');
                setNewTotal('');
                setNewSorted('');
                setNewStatus('Complete'); // Default to "Complete"
                Alert.alert('Success', 'Equipment added successfully.');
            } catch (error) {
                Alert.alert('Error', 'Failed to add equipment.');
                console.error(error);
            } finally {
                setSaving(false);
            }
        } else {
            Alert.alert('Validation Error', 'Please enter valid item name and total items.');
        }
    };

    const handleDelete = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this equipment?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setSaving(true);
                        try {
                            await deleteEquipment(id);
                            setEquipment((prev) => prev.filter((item) => item.id !== id));
                            Alert.alert('Deleted', 'Equipment deleted successfully.');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete equipment.');
                            console.error(error);
                        } finally {
                            setSaving(false);
                        }
                    },
                },
            ]
        );
    };

    const handleUpdate = (id, field, value) => {
        setEquipment((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        try {
            const updatePromises = equipment.map((item) =>
                updateEquipment(item.id, {
                    item_name: item.item_name,
                    total_items: parseInt(item.total_items, 10),
                    sorted_items: parseInt(item.sorted_items, 10),
                    status: item.status,
                })
            );
            await Promise.all(updatePromises);
            Alert.alert('Success', 'All changes have been saved.');
        } catch (error) {
            Alert.alert('Error', 'Failed to save changes.');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={24} color="#FF3B30" />
            </TouchableOpacity>
            <Text style={[styles.rowText, { flex: 2 }]}>{item.item_name}</Text>
            <Text style={[styles.rowText, { flex: 1 }]}>{item.total_items}</Text>
            <Text style={[styles.rowText, { flex: 1 }]}>{item.sorted_items}</Text>
            <Text style={[styles.rowText, { flex: 1 }]}>{item.status}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#eeba2b" />
                <Text>Loading Equipment...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={30} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Equipment Management</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={[styles.headerText, { flex: 2 }]}>ITEMS</Text>
                <Text style={[styles.headerText, { flex: 1 }]}>NO. OF ITEMS</Text>
                <Text style={[styles.headerText, { flex: 1 }]}>NO. OF SORTED ITEMS</Text>
                <Text style={[styles.headerText, { flex: 1 }]}>STATUS</Text>
            </View>

            {/* Equipment List */}
            <FlatList
                data={equipment}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No equipment available.</Text>
                }
                contentContainerStyle={equipment.length === 0 && styles.emptyContainer}
            />

            {/* Add New Equipment Section */}
            <View style={styles.addContainer}>
                <Text style={styles.addTitle}>Add New Equipment</Text>
                <TextInput
                    value={newItem}
                    onChangeText={setNewItem}
                    placeholder="Item Name"
                    style={styles.addInput}
                />
                <TextInput
                    value={newTotal}
                    onChangeText={setNewTotal}
                    placeholder="Total Items"
                    style={styles.addInput}
                    keyboardType="number-pad"
                />
                <TextInput
                    value={newSorted}
                    onChangeText={setNewSorted}
                    placeholder="Sorted Items"
                    style={styles.addInput}
                    keyboardType="number-pad"
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Picker
                        selectedValue={newStatus}
                        style={styles.picker}
                        onValueChange={(value) => setNewStatus(value)}
                    >
                        <Picker.Item label="Complete" value="Complete" />
                        <Picker.Item label="Missing" value="Missing" />
                        <Picker.Item label="Broken" value="Broken" />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAdd}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.addButtonText}>Add Equipment</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Save Changes Button */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
                disabled={saving}
            >
                {saving ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        alignSelf: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495057',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 14,
        color: '#212529',
        textAlign: 'center',
    },
    deleteButton: {
        alignItems: 'flex-start',
        marginRight: -15,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 20,
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    addContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    addTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    addInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#eeba2b',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default EquipmentSP;
