import React, { useEffect, useState } from 'react';

interface RequestedProduct {
    _id: string;
    user_id: string; // Adjust type based on how you store user IDs (string or ObjectId)
    link: string;
    status: string;
    createdAt: Date; // Adjust based on the actual type in your database
}

const AdminDashboard = () => {
    const [requestedProducts, setRequestedProducts] = useState<RequestedProduct[]>([]);

    useEffect(() => {
        const fetchRequestedProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/get-requests`);
                const data = await response.json();
                setRequestedProducts(data);
            } catch (error) {
                console.error('Error fetching requested products:', error);
            }
        };

        fetchRequestedProducts();
    }, []);

    const handleAffiliateLinkSubmit = async (productLink: string, affiliateLink: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/update-request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:"include",
                body: JSON.stringify({
                    productLink,
                    affiliateLink,
                }),
            });

            if (response.ok) {
                // setRequestedProducts((prevProducts) =>
                //     prevProducts.filter((product) => product._id !== productId)
                // );
                alert('Affiliate link added, email sent, and request deleted successfully!');
            } else {
                alert('Failed to update request');
            }
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    return (
        <div className="p-8 bg-white text-left text-base text-darkslategray-100 font-sora">
            <h1 className="text-3xl font-semibold mb-4">Requested Products</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">User ID</th>
                        <th className="border border-gray-300 p-2">Link</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Requested At</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requestedProducts.map((product) => (
                        <tr key={product._id}>
                            <td className="border border-gray-300 p-2">{product.user_id}</td>
                            <td className="border border-gray-300 p-2">{product.link}</td>
                            <td className="border border-gray-300 p-2">{product.status}</td>
                            <td className="border border-gray-300 p-2">
                                {new Date(product.createdAt).toLocaleString()}
                            </td>
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="text"
                                    placeholder="Affiliate Link"
                                    className="p-1 border border-gray-400 rounded"
                                    onBlur={(e) =>
                                        handleAffiliateLinkSubmit(product.link, e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
