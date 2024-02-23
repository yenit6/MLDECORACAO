#include <stdio.h>


int main(){


struct prod{

    char mes[3];
    char Prod;
    float emax;
    float emix;
    float tr;
    float lr;
    float ea;
    float vmd;


};

struct prod a[2];


int i;
int k;

for ( i = 0; i < 3; i++)
{
    printf("Digite as Informaçoes do produto");
    scanf(a[i].Prod);

    for ( k = 0; k < 3; k++)
    {
        printf("A Quantidade de Itens Vendidos no %d mes :",k);
        scanf(a[i].mes[k]);
    }
    
}


    return 0;
} 