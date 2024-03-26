import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner Teclado = new Scanner(System.in);

        System.out.println("\nDigite o primeiro mes do Produto a");
        float mesa1 = Teclado.nextFloat();

        System.out.println("\nDigite o Segundo mes do Produto a");
        float mesa2 = Teclado.nextFloat();

        System.out.println("\nDigite o Terceiro mes do Produto a");
        float mesa3 = Teclado.nextFloat();

        System.out.println("\nDigite o tmepo de reposição do Produto a");

        int tra = Teclado.nextInt();

        System.out.println("\nlOTE DE REPOSIÇÃO do Produto a");

        int lra = Teclado.nextInt();

        System.out.println("\nDigite o Estoque atual do Produto a");

        int eaa = Teclado.nextInt();

        float vmda = ((mesa1 + mesa2 + mesa3) / 3) / 25;
        float emina = (tra * vmda);
        float emaxa = (lra + emina);

        System.out.println("\033[H\033[2J");
        System.out.flush();

        System.out.println("\nDigite o primeiro mes do Produto B");
        float mesb1 = Teclado.nextFloat();

        System.out.println("\nDigite o Segundo mes do Produto B");
        float mesb2 = Teclado.nextFloat();

        System.out.println("\nDigite o Terceiro mes do Produto B");
        float mesb3 = Teclado.nextFloat();

        System.out.println("\nDigite o tmepo de reposição do Produto A");

        int trb = Teclado.nextInt();

        System.out.println("\nlOTE DE REPOSIÇÃO do Produto B");

        int lrb = Teclado.nextInt();

        System.out.println("\nDigite o Estoque atual do Produto B");

        int eab = Teclado.nextInt();

        float vmdb = ((mesb1 + mesb2 + mesb3) / 3) / 25;
        float eminb = (trb * vmdb);
        float emaxb = (lrb + eminb);

        /*
         * \033[H mo o curso pro inicio do terminal
         * \033[2J limpa a tela
         */

        System.out.println("\033[H\033[2J");
        System.out.flush();

        System.out.println("\nDigite o primeiro mes do Produto C");
        float mesC1 = Teclado.nextFloat();

        System.out.println("\nDigite o Segundo mes do Produto c");
        float mesC2 = Teclado.nextFloat();

        System.out.println("\nDigite o Terceiro mes do Produto C");
        float mesC3 = Teclado.nextFloat();

        System.out.println("\nDigite o tmepo de reposição do Produto C");

        int trC = Teclado.nextInt();

        System.out.println("\nlOTE DE REPOSIÇÃO do Produto C");

        int lrC = Teclado.nextInt();

        System.out.println("\nDigite o Estoque atual do Produto C");

        int eaC = Teclado.nextInt();

        float vmdC = ((mesC1 + mesC2 + mesC3) / 3) / 25;
        float eminc = (trC * vmdC);
        float emaxc = (lrC + eminc);

        System.out.println("\033[H\033[2J");
        System.out.flush();

        System.out.println("\nO Mes 1 do produto A foi :" + mesa1);
        System.out.println("\nO Mes 2 do produto A foi :" + mesa2);
        System.out.println("\nO Mes 3 do produto A foi :" + mesa3);
        System.out.println("\nO Tempo de reposição do produto A foi :+" + tra);
        System.out.println("\nO lote de reposição do produto A foi :" + lra);
        System.out.println("\no Estoque atual e  do produto A foi :" + eaa);

        System.out.println("a Venda diaria maxima do produto a e :" + vmda);
        System.out.println("O ESTOQUE MINIMO DO PRODUTO E :" + emina);
        System.out.println("O estoque maximo do produto e :" + emaxa);

        if (emina >= emaxa) {
            System.out.println("Não e necessario comprar o produto a");

        } else if (eaa <= emina) {
            System.out.println("O Produto a e necessario comprar");
        }

        System.out.println("O mes 1 do Produto B foi :" + mesb1);
        System.out.println("O Mes 2 do Produto B foi :" + mesb2);
        System.out.println("O Mes 3 do Produto B foi :" + mesb3);
        System.out.println("\nO Tempo de reposição do produto B foi :+" + trb);
        System.out.println("\nO lote de reposição do produto B foi :" + lrb);
        System.out.println("\no Estoque atual e  do produto B foi :" + eab);

        System.out.println("O mes 1 do Produto C foi :" + mesC1);
        System.out.println("O Mes 2 do Produto C foi :" + mesC2);
        System.out.println("O Mes 3 do Produto C foi :" + mesC3);
        System.out.println("\nO Tempo de reposição do produto C foi :+" + trC);
        System.out.println("\nO lote de reposição do produto C foi :" + lrC);
        System.out.println("\no Estoque atual e  do produto C foi :" + eaC);

    }

}
