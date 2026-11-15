# 1. Aquisição e Conversão de Dados

## Sensores e Transdutores
Diversos sensores monitoram continuamente parâmetros essenciais, tais como:
* Temperatura;
* Pressão;
* Vibração;
* Níveis de radiação;
* Dados biométricos dos astronautas, como frequência cardíaca e sinais vitais.

## Conversão Analógico-Digital (A/D)
Conversão em sequências binárias (0 e 1) por meio de conversores analógico-digitais (ADC), microcontroladores e FPGAs embarcados.

---

# 2. Padronização e Empacotamento dos Dados

São utilizados os padrões internacionais definidos pelo **CCSDS** (*Consultative Committee for Space Data Systems*).

## Pacotes de Origem (Source Packets)
Os dados são organizados em pacotes contendo:
* Identificação da origem;
* Data e hora da coleta (*timestamp*);
* Numeração sequencial para controle de integridade.

## Quadros de Transmissão (Transfer Frames)
Os pacotes são agrupados em estruturas maiores, chamadas quadros de transmissão, que facilitam:
* Sincronização;
* Controle de fluxo;
* Gerenciamento da comunicação entre espaçonave e Terra.

---

# 3. Compressão de Dados

Como a largura de banda disponível para comunicações espaciais é limitada, os dados passam por técnicas de compressão.

## Compressão Sem Perdas (Lossless)
Utilizada em informações críticas, onde nenhum dado pode ser alterado ou descartado, incluindo:
* Telemetria de voo;
* Comandos de controle;
* Dados científicos essenciais.

## Compressão Com Perdas (Lossy)
Aplicada principalmente a:
* Vídeos HD e 4K;
* Fotografias científicas;
* Imagens de alta resolução.

Essa técnica reduz significativamente o volume de dados transmitidos, otimizando o uso do canal de comunicação.

---

# 4. Correção de Erros (FEC)

Durante a transmissão espacial, os sinais sofrem perda de potência e interferências causadas pelo ambiente. Para minimizar falhas, utiliza-se a técnica de **Forward Error Correction (FEC)**.

## Como funciona
* Bits redundantes são adicionados aos dados originais.
* Algoritmos como Reed-Solomon, Turbo Codes e LDPC geram essas informações extras.
* Ao receber o sinal, a estação terrestre utiliza os bits redundantes para identificar e corrigir automaticamente possíveis erros.

Esse mecanismo reduz a necessidade de retransmissões, algo fundamental em missões de longa distância, onde a latência pode ser de vários minutos.

---

# 5. Criptografia e Segurança

A segurança das comunicações espaciais é essencial para proteger missões e evitar interferências externas. Por isso, informações críticas, especialmente:
* Comandos enviados da Terra;
* Telemetria operacional;
* Dados sensíveis da missão;

são criptografadas antes da transmissão.

**Essa proteção garante:**
* Confidencialidade;
* Integridade dos dados;
* Prevenção contra interceptação ou adulteração de informações.

---

# 6. Modulação do Sinal

Após todo o processamento, os dados digitais precisam ser convertidos em sinais adequados para transmissão.

## Modulação por Rádio Frequência
Os bits são inseridos em ondas portadoras de alta frequência utilizando técnicas como:
* **BPSK** (*Binary Phase Shift Keying*);
* **QPSK** (*Quadrature Phase Shift Keying*).

Essas técnicas permitem o envio eficiente dos dados através das bandas S, X, Ku e Ka utilizadas nas comunicações espaciais.

## Comunicação Óptica a Laser
Nos sistemas mais modernos, os dados podem ser transmitidos por feixes de luz infravermelha. Nesse caso:
* Os bits modulam pulsos de laser;
* A transmissão ocorre por telescópios de comunicação;
* Obtêm-se velocidades muito superiores às comunicações por rádio tradicionais.