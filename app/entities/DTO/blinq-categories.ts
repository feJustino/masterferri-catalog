export interface CategoriaPaiDTO {
  id: number;
}

export interface CategoriaDTO {
  id: number;
  descricao: string;
  categoriaPai?: CategoriaPaiDTO;
}

export interface CategoriasResponseDTO {
  data: CategoriaDTO[];
}

export interface CategoryFilters {
  page?: number;
  limit?: number;
}

export interface PaginatedCategoriesResponse {
  data: CategoriaDTO[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
