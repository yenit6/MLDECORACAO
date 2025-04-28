async function CarregarProdutos(PessoaList, GerarListaDeProdutos) {
    try {
        const response = await fetch('../Private/Produtos.json')
        if (!response.ok) throw new Error("Erro ao fazer a busca dos produtos no json")

        const data = await response.json()
        PessoaList.length = 0

        PessoaList.push(...data)

        if (PessoaList.length === 0) {
            console.log('A lista está vazia!')
        }else {
            GerarListaDeProdutos()
        }

    }catch (e) {
        console.log("Erro ao carregar os produtos!:\n>>", e.message)
    }
}

export { CarregarProdutos }