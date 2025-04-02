import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { categoryService, type Category } from '../../services/category.service';
import { artworkService, type Artwork } from '../../services/artwork.service';
import { Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '../../components/ui/table';

interface FormData {
  title: string;
  description: string;
  price: string;
  image: File | null;
  categoryId: string;
  quantity: string;
  medium: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  categoryName: string;
  year: number;
  isFeatured: boolean;
}

export function ArtworkManagement() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    image: null,
    categoryId: '',
    quantity: '1',
    medium: '',
    dimensions: {
      width: 0,
      height: 0,
      unit: 'cm' as const,
    },
    categoryName: '',
    year: new Date().getFullYear(),
    isFeatured: false,
  });
  const { token, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchArtworks();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch categories',
        variant: 'destructive',
      });
    }
  };

  const fetchArtworks = async () => {
    try {
      if (!user?.id) {
        throw new Error('User not found');
      }
      const data = await artworkService.getMyArtworks();
      setArtworks(data.artworks || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch artworks',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description || '',
      price: artwork.price.toString(),
      image: null,
      categoryId: artwork.categoryId,
      quantity: artwork.quantity.toString(),
      medium: artwork.medium || '',
      dimensions: artwork.dimensions || {
        width: 0,
        height: 0,
        unit: 'cm',
      },
      categoryName: artwork.category?.name || '',
      year: artwork.year || new Date().getFullYear(),
      isFeatured: artwork.isFeatured || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user?.id) {
        throw new Error('User not found');
      }

      if (!editingArtwork && !formData.image) {
        throw new Error('Please select an image');
      }

      let artwork;
      if (editingArtwork) {
        // Update existing artwork
        artwork = await artworkService.update(editingArtwork.id, {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
          categoryId: formData.categoryId,
        });
        setArtworks(prev => prev.map(a => a.id === artwork.id ? artwork : a));
      } else {
        // Create new artwork
        artwork = await artworkService.create({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image!,
          categoryId: formData.categoryId,
          artistId: user.id,
        });
        setArtworks(prev => [...prev, artwork]);
      }

      setIsDialogOpen(false);
      setEditingArtwork(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        image: null,
        categoryId: '',
        quantity: '1',
        medium: '',
        dimensions: {
          width: 0,
          height: 0,
          unit: 'cm',
        },
        categoryName: '',
        year: new Date().getFullYear(),
        isFeatured: false,
      });
      toast({
        title: 'Success',
        description: `Artwork ${editingArtwork ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      console.error('Error saving artwork:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save artwork',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await artworkService.delete(id);
      setArtworks(artworks.filter((artwork) => artwork.id !== id));
      toast({
        title: 'Success',
        description: 'Artwork deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete artwork',
        variant: 'destructive',
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    setFormData(prev => ({
      ...prev,
      categoryId,
      categoryName: selectedCategory?.name || '',
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Artworks</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setEditingArtwork(null);
            setFormData({
              title: '',
              description: '',
              price: '',
              image: null,
              categoryId: '',
              quantity: '1',
              medium: '',
              dimensions: {
                width: 0,
                height: 0,
                unit: 'cm',
              },
              categoryName: '',
              year: new Date().getFullYear(),
              isFeatured: false,
            });
          }
          setIsDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button>Add New Artwork</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}</DialogTitle>
              <DialogDescription>
                {editingArtwork ? 'Update the details of your artwork' : 'Fill in the details of your new artwork'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium</Label>
                <Input
                  id="medium"
                  value={formData.medium}
                  onChange={(e) =>
                    setFormData({ ...formData, medium: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.dimensions.width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions,
                          width: parseFloat(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.dimensions.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions,
                          height: parseFloat(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files?.[0] || null })
                  }
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Saving...' : editingArtwork ? 'Update Artwork' : 'Create Artwork'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{artwork.title}</CardTitle>
              <CardDescription>{artwork.category?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price:</span>
                  <span>${Number(artwork.price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Quantity:</span>
                  <span>{artwork.quantity}</span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(artwork)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {artworks.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No artworks found. Add your first artwork!</p>
          </div>
        )}
      </div>
    </div>
  );
} 