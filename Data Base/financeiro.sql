-- TABELA FINANCEIRO

USE db_CARRO


RETURN SCOPE_IDENTITY()



-- CRIAR FINANCEIRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_CRIAR_FINANCEIRO'))
	DROP PROCEDURE SP_CRIAR_FINANCEIRO
GO
CREATE PROCEDURE SP_CRIAR_FINANCEIRO
	
	@VALOR		MONEY,
	@PARCELAS	INT,
	@PERCENTUAL	INT,
	@VENCIMENTO	INT,
	@ID			INT

AS
BEGIN

	INSERT tb_FINANCEIRO	(
								FIN_VALOR,	
								FIN_PARCELAS,
								FIN_PERCENTUAL,	
								FIN_VENCIMENTO,	
								FK_CLI_CODIGO	
							)
	VALUES	(
				@VALOR,		
				@PARCELAS,	
				@PERCENTUAL,	
				@VENCIMENTO,
				@ID
			)

END













-- EDITAR FINANCEIRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_EDITAR_FINANCEIRO'))
	DROP PROCEDURE SP_EDITAR_FINANCEIRO
GO
CREATE PROCEDURE SP_EDITAR_FINANCEIRO
	
	@ID			INT,
	@VALOR		MONEY,
	@PARCELAS	INT,
	@PERCENTUAL	INT,
	@VENCIMENTO	INT

AS
BEGIN

	UPDATE tb_FINANCEIRO SET 
								FIN_VALOR = @VALOR,	
								FIN_PARCELAS = @PARCELAS,
								FIN_PERCENTUAL = @PERCENTUAL,
								FIN_VENCIMENTO = @VENCIMENTO
	WHERE FK_CLI_CODIGO = @ID

END












-- EXCLUIR FINANCEIRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_EXCLUIR_FINANCEIRO'))
	DROP PROCEDURE SP_EXCLUIR_FINANCEIRO
GO
CREATE PROCEDURE SP_EXCLUIR_FINANCEIRO
	
	@ID			INT

AS
BEGIN

	DELETE FROM tb_FINANCEIRO WHERE FK_CLI_CODIGO = @ID

END









-- SELECIONAR FINANCEIRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_SELECIONAR_FINANCEIRO'))
	DROP PROCEDURE SP_SELECIONAR_FINANCEIRO
GO
CREATE PROCEDURE SP_SELECIONAR_FINANCEIRO
	
AS
BEGIN

	SELECT * FROM tb_FINANCEIRO

END













-- BUSCAR FINANCEIRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_BUSCAR_FINANCEIRO'))
	DROP PROCEDURE SP_BUSCAR_FINANCEIRO
GO
CREATE PROCEDURE SP_BUSCAR_FINANCEIRO
	@ID			INT 
	-- ID DA TABELA CLIENTE
AS
BEGIN

	SELECT 
			CLI.CLI_NOME 'NOME',
			CLI.CLI_CPF 'CPF',

			TEL.TEL_TELEFONE 'TELEFONE',

			CAR.CAR_MARCA 'MARCA',
			CAR.CAR_MODELO 'MODELO',
			CAR.CAR_PRECO 'VALOR PAGO',

			FIN.FIN_PARCELAS 'PARCELAS',
			FIN.FIN_VALOR 'VALOR DA PARCELA',
			FIN.FIN_VENCIMENTO 'VENCIMENTO TODO DIA'
			
	FROM tb_CARRO CAR
		INNER JOIN tb_CLIENTE CLI
			ON CAR.CAR_CODIGO = CLI.FK_CAR_CODIGO
		INNER JOIN tb_FINANCEIRO FIN
			ON CLI.CLI_CODIGO = FIN.FK_CLI_CODIGO
		INNER JOIN TELEFONE TEL
			ON CLI.CLI_CODIGO = TEL.FK_CLI_CODIGO

	WHERE CLI.CLI_CODIGO = @ID

END



/*
{
	"parcelas":60,
	"preco":"60000",
	"entrada":"15000",
	"vencimento":"15"
}
*/