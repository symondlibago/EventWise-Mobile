import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchEquipment } from '../../../services/authServices';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import { useNavigation } from '@react-navigation/native'; // To handle navigation 

const EquipmentInventory = ({ route }) => {
    const { eventId } = route.params; // Ensure eventId is passed
    const [equipment, setEquipment] = useState([]);
    const [totals, setTotals] = useState({ totalItems: 0, brokenItems: 0, missingItems: 0 });
    
    const navigation = useNavigation(); // Initialize navigation hook

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const data = await fetchEquipment(eventId);

                // Calculate totals for the whole inventory
                const totalItems = data.reduce((sum, item) => sum + item.total_items, 0);

                // Calculate broken and missing items based on the difference (total_items - sorted_items)
                let brokenItems = 0;
                let missingItems = 0;

                data.forEach(item => {
                    const unsortedItems = item.total_items - item.sorted_items;

                    if (item.status === 'Broken') {
                        brokenItems += unsortedItems;
                    } else if (item.status === 'Missing') {
                        missingItems += unsortedItems;
                    }
                });

                setEquipment(data);
                setTotals({ totalItems, brokenItems, missingItems });
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        loadInventory();
    }, [eventId]);

    const renderStatus = (status) => {
        const statusColors = {
            Complete: '#28a745',
            Missing: '#ffc107',
            Broken: '#dc3545',
        };

        return (
            <Text style={{ color: statusColors[status] || '#6c757d', fontWeight: 'bold' }}>
                {status || 'Unknown'}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>Equipment Inventory</Text>
            </View>
            
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
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={[styles.rowText, { flex: 2 }]}>{item.item_name}</Text>
                        <Text style={[styles.rowText, { flex: 1 }]}>{item.total_items}</Text>
                        <Text style={[styles.rowText, { flex: 1 }]}>{item.sorted_items || 0}</Text>
                        <View style={{ flex: 1 }}>{renderStatus(item.status)}</View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>No equipment added yet.</Text>
                }
            />

            {/* Totals Section */}
            <View style={styles.totals}>
                <Text style={styles.totalText}>Total Items: <Text style={styles.boldText}>{totals.totalItems}</Text></Text>
                <Text style={styles.totalText}>Total Items Broken: <Text style={styles.boldText}>{totals.brokenItems}</Text></Text>
                <Text style={styles.totalText}>Total Items Missing: <Text style={styles.boldText}>{totals.missingItems}</Text></Text>
            </View>

            {/* Action Buttons (Optional) */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add New Item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Export Inventory</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    goBackButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
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
    },
    rowText: {
        fontSize: 14,
        color: '#212529',
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    totals: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderColor: '#dee2e6',
    },
    totalText: {
        fontSize: 16,
        marginVertical: 4,
        color: '#212529',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
    },
    buttonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EquipmentInventory;
