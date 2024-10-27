// components/SellProductForm.tsx
"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    quantity: string;
    image: File | null;
    expected_price: string;
}

const SellProductForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        quantity: '',
        image: null,
        expected_price: '',
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files && files.length > 0 ? files[0] : value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('quantity', formData.quantity);
        if (formData.image) data.append('image', formData.image);
        data.append('expected_price', formData.expected_price);


        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/create/', {
                method: 'POST',
                body: data,
                
            });

            if (response.ok) {
                alert('Product created successfully!');
                // Optionally, redirect to another page or reset the form
                setFormData({ name: '', quantity: '', image: null, expected_price: '' });
                router.push('/shop'); // Redirect to the shop page or wherever needed
            } else {
                alert('Error creating product');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="quantity"
                placeholder="Quantity (kg/items)"
                value={formData.quantity}
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="image"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="expected_price"
                placeholder="Expected Price"
                value={formData.expected_price}
                onChange={handleChange}
                required
            />
            <button type="submit">Sell Product</button>
        </form>
    );
};

export default SellProductForm;
