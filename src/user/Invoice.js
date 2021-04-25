import React from 'react';
import moment from 'moment'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';


const Invoice = ({history}) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>
                ~ {new Date().toLocaleString()} ~
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.author}>DON SHOP</Text>
            <Text style={styles.subtitle}>Order Summary</Text>

            <Table>
                <TableHeader>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Transaction ID</TableCell>
                </TableHeader>
            </Table>

            <Table data={history}>
                <TableBody>
                        <DataTableCell getContent={(m) => m.product[0].name} />
                        <DataTableCell style={styles.tabeltext} getContent={(m) => `$${m.product[0].price}`} />
                        <DataTableCell style={styles.tabeltext} getContent={(m) => m.product[0].count} />
                        <DataTableCell style={styles.tabeltext} getContent={(m) => m.transaction_id} />

                </TableBody>
            </Table>

            <Text style={styles.text}>
                Date: {" "} 
                {moment(history.createdAt).fromNow()}
            </Text>
            <Text style={styles.footer}>
                Thank you for shopping with us
            </Text>

        </Page>
    </Document>
);


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 50,
        paddingHorizontal: 35,
    },
    header: {
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 14,
    },
    footer: {
        fontSize: 14,
    },
    tabeltext: {
        textAlign: "center",
        marginBottom: 2,
        marginTop: 2,
    }
})

    


export default Invoice;