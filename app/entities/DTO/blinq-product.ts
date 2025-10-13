// Enums
export type TipoProduto = 'S' | 'P' | 'N';
export type SituacaoProduto = 'A' | 'I';
export type FormatoProduto = 'S' | 'V' | 'E';
export type TipoProducao = 'P' | 'T';
export type CondicaoProduto = 0 | 1 | 2;
export type UnidadeMedida = 0 | 1 | 2;
export type TipoArmamento = 0 | 1;
export type ActionEstoque = 'Z' | 'T';
export type TipoEstoque = 'F' | 'V';
export type LancamentoEstoque = 'A' | 'M' | 'P';

// DTOs auxiliares
export interface ProdutosCategoriaDTO {
  id: number;
}

export interface ProdutosEstoqueDTO {
  minimo?: number;
  maximo?: number;
  crossdocking?: number;
  localizacao?: string;
  saldoVirtualTotal?: number;
}

export interface FornecedorContatoDTO {
  id?: number;
  nome?: string;
}

export interface ProdutoFornecedorDTO {
  id?: number;
  contato?: FornecedorContatoDTO;
  codigo?: string;
  precoCusto?: number;
  precoCompra?: number;
}

export interface ProdutosDimensoesDTO {
  largura?: number;
  altura?: number;
  profundidade?: number;
  unidadeMedida?: UnidadeMedida;
}

export interface ProdutosGrupoProdutoDTO {
  id: number;
}

export interface ProdutosTributacaoDTO {
  origem?: number;
  nFCI?: string;
  ncm?: string;
  cest?: string;
  codigoListaServicos?: string;
  spedTipoItem?: string;
  codigoItem?: string;
  percentualTributos?: number;
  valorBaseStRetencao?: number;
  valorStRetencao?: number;
  valorICMSSubstituto?: number;
  codigoExcecaoTipi?: string;
  classeEnquadramentoIpi?: string;
  valorIpiFixo?: number;
  codigoSeloIpi?: string;
  valorPisFixo?: number;
  valorCofinsFixo?: number;
  codigoANP?: string;
  descricaoANP?: string;
  percentualGLP?: number;
  percentualGasNacional?: number;
  percentualGasImportado?: number;
  valorPartida?: number;
  tipoArmamento?: TipoArmamento;
  descricaoCompletaArmamento?: string;
  dadosAdicionais?: string;
  grupoProduto?: ProdutosGrupoProdutoDTO;
}

export interface ProdutosVideoDTO {
  url: string;
}

export interface ProdutosImagemDTO {
  link: string;
}

export interface ProdutosAnexoDTO {
  id: number;
}

export interface ProdutosAnexoVinculoDTO {
  id: number;
}

export interface ProdutosImagemInternaDTO {
  link: string;
  linkMiniatura: string;
  validade: string;
  ordem: number;
  anexo: ProdutosAnexoDTO;
  anexoVinculo: ProdutosAnexoVinculoDTO;
}

export interface ProdutosImagensDTO {
  externas?: ProdutosImagemDTO[];
  internas?: ProdutosImagemInternaDTO[];
}

export interface ProdutosMidiaDTO {
  video: ProdutosVideoDTO;
  imagens: ProdutosImagensDTO;
}

export interface ProdutosLinhaProdutoDTO {
  id: number;
}

export interface ProdutosComponenteProdutoDTO {
  id: number;
}

export interface ProdutosComponenteDTO {
  produto: ProdutosComponenteProdutoDTO;
  quantidade: number;
}

export interface ProdutosEstruturaDTO {
  tipoEstoque: TipoEstoque;
  lancamentoEstoque: LancamentoEstoque;
  componentes: ProdutosComponenteDTO[];
}

export interface ProdutosCampoCustomizadoDTO {
  idCampoCustomizado: number;
  idVinculo?: number;
  valor?: string;
  item?: string;
}

export interface ProdutosProdutoPaiDTO {
  id?: number;
  cloneInfo: boolean;
}

export interface ProdutosVariacaoDTO {
  nome: string;
  ordem: number;
  produtoPai: ProdutosProdutoPaiDTO;
}

// Estoque DTO (ajustado para usar o tipo existente)
export interface EstoqueGetAllResponseDTO extends ProdutosEstoqueDTO {
  saldoVirtualTotal: number; // Saldo em estoque atual, considerando a reserva de estoque
}

// Interface base do produto (versão simplificada para listagem)
export interface ProdutosDadosBaseDTO {
  id: number;
  idProdutoPai?: number;
  nome: string;
  codigo: string;
  preco: number;
  precoCusto?: number;
  estoque?: EstoqueGetAllResponseDTO;
  tipo: TipoProduto;
  situacao: SituacaoProduto;
  formato: FormatoProduto;
  descricaoCurta?: string;
  imagemURL?: string;
}

// Interface completa do produto (para detalhes)
export interface ProdutosDadosDTO {
  id?: number;
  nome: string;
  codigo?: string;
  preco?: number;
  tipo: TipoProduto;
  situacao?: SituacaoProduto;
  formato: FormatoProduto;
  descricaoCurta?: string;
  imagemURL?: string;
  dataValidade?: string;
  unidade?: string;
  pesoLiquido?: number;
  pesoBruto?: number;
  volumes?: number;
  itensPorCaixa?: number;
  gtin?: string;
  gtinEmbalagem?: string;
  tipoProducao?: TipoProducao;
  condicao?: CondicaoProduto;
  freteGratis?: boolean;
  marca?: string;
  descricaoComplementar?: string;
  linkExterno?: string;
  observacoes?: string;
  descricaoEmbalagemDiscreta?: string;
  categoria?: ProdutosCategoriaDTO;
  estoque?: ProdutosEstoqueDTO;
  fornecedor?: ProdutoFornecedorDTO;
  actionEstoque?: ActionEstoque;
  dimensoes?: ProdutosDimensoesDTO;
  tributacao?: ProdutosTributacaoDTO;
  midia?: ProdutosMidiaDTO;
  linhaProduto?: ProdutosLinhaProdutoDTO;
  estrutura?: ProdutosEstruturaDTO;
  camposCustomizados?: ProdutosCampoCustomizadoDTO[];
  variacoes?: ProdutoVariacaoDTO[];
}

// Interface para variações (extende o produto base)
export interface ProdutoVariacaoDTO
  extends Omit<ProdutosDadosDTO, 'variacoes'> {
  variacao: ProdutosVariacaoDTO;
}

// Interfaces de resposta da API
export interface ProdutosResponseDTO {
  data: ProdutosDadosBaseDTO[]; // Lista de produtos (versão simplificada)
}

export interface SingleProdutoResponseDTO {
  data: ProdutosDadosDTO; // Produto individual (versão completa)
}
