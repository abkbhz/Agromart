'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';


interface FormData {
  name: string;
  quantity: string;
  image: File | null;
  expected_price: string;
}

interface NewProduct {
  name: string;
  quantity: string;
  unit: 'kg' | 'items';
  price: string;
  image: string | null;
}

const FarmerDashboard: React.FC = () => {
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


  const [showSellProduct, setShowSellProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
    image: null
  });

  const salesData = [
    { month: 'Jan', sales: 45000, profit: 15000 },
    { month: 'Mar', sales: 52000, profit: 18000 },
    { month: 'Jun', sales: 61000, profit: 22000 },
    { month: 'Sep', sales: 58000, profit: 20000 },
    { month: 'Dec', sales: 65000, profit: 24000 },
  ];

  const cropDistribution = [
    { name: 'Wheat', value: 4200 },
    { name: 'Rice', value: 3800 },
    { name: 'Corn', value: 2900 },
    { name: 'Soybeans', value: 2100 },
  ];

  const monthlyExpenses = [
    { category: 'Seeds', amount: 8000 },
    { category: 'Fertilizer', amount: 12000 },
    { category: 'Labor', amount: 15000 },
    { category: 'Equipment', amount: 10000 },
    { category: 'Irrigation', amount: 5000 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ef4444'];

  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  const handleSellProduct = () => {
    console.log('Product to sell:', newProduct);
    setNewProduct({ name: '', quantity: '', unit: 'kg', price: '', image: null });
    setShowSellProduct(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{greeting}, Praveen!</h1>
        <p className="text-lg text-gray-600">Here's an overview of your farm's performance</p>
      </div>

      {/* Sell Your Product Button */}
      <div className="max-w-5xl mx-auto mb-10">
  <Dialog open={showSellProduct} onOpenChange={setShowSellProduct}>
    <DialogTrigger asChild>
      <Button className="bg-green-600 hover:bg-green-700">
        <Plus className="w-4 h-4 mr-2" /> Sell Your Product
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sell Your Product</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex gap-2">
              <Input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="flex-grow"
                required
              />
              <Select
                value={formData.unit}
                onValueChange={(value: 'kg' | 'items') => setFormData(prev => ({ ...prev, unit: value }))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="items">items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image Upload</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="Product" className="mt-2 max-w-full h-auto" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expected_price">Expected Price (₹)</Label>
            <Input
              id="expected_price"
              name="expected_price"
              value={formData.expected_price}
              onChange={handleChange}
              placeholder="₹"
              required
            />
          </div>
        </div>
        <Button type="submit">Submit Product</Button>
      </form>
    </DialogContent>
  </Dialog>
</div>

      {/* Analysis Graphs Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Sales Performance */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Sales"
                    dot={{ stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Profit"
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#22c55e" name="Amount (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;