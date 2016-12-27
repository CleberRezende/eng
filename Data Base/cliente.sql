-- tb_CLIENTE


USE db_CARRO


RETURN SCOPE_IDENTITY()


-- CRIAR CLIENTE
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_CRIAR_CLIENTE'))
	DROP PROCEDURE SP_CRIAR_CLIENTE
GO
CREATE PROCEDURE SP_CRIAR_CLIENTE
	@NOME			VARCHAR(50),
	@CPF			VARCHAR(30),
	@SEXO			VARCHAR(30),
	@ID_CARRO		INT
AS
BEGIN

	INSERT tb_CLIENTE	(
							CLI_NOME,	
							CLI_CPF,		
							CLI_SEXO,	
							FK_CAR_CODIGO
						)
	VALUES	(
				@NOME,	
				@CPF,	
				@SEXO,	
				@ID_CARRO
			)

	RETURN SCOPE_IDENTITY() 

END










-- BUSCAR CLIENTE
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_BUSCAR_CLIENTE'))
	DROP PROCEDURE SP_BUSCAR_CLIENTE
GO
CREATE PROCEDURE SP_BUSCAR_CLIENTE
	@ID_CLIENTE		INT
AS
BEGIN 
	SELECT  

			CLI.CLI_NOME 'NOME',
			CLI.CLI_CPF	'CPF',
			CLI.CLI_SEXO 'SEXO',

			TEL.TEL_TELEFONE 'TELEFONE',

			EN.END_RUA 'RUA',
			EN.END_BAIRRO 'BAIRRO',
			EN.END_CEP 'CEP',
			EN.END_COMPLEMENTO 'COMPLEMENTO'

		FROM tb_CLIENTE CLI
			INNER JOIN tb_ENDERECO EN
				ON CLI.CLI_CODIGO = EN.FK_CLI_CODIGO
			INNER JOIN TELEFONE TEL
				ON EN.END_CODIGO = TEL.TEL_CODIGO
		
		WHERE CLI.CLI_CODIGO = @ID_CLIENTE
END 

EXEC SP_BUSCAR_CLIENTE 1













-- BUSCAR CLIENTE E CARRO
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_BUSCAR_CLIENTE_CARRO'))
	DROP PROCEDURE SP_BUSCAR_CLIENTE_CARRO
GO
CREATE PROCEDURE SP_BUSCAR_CLIENTE_CARRO
	@ID_CLIENTE		INT
AS
BEGIN 
	SELECT  

			CLI.CLI_NOME 'NOME',
			CLI.CLI_CPF	'CPF',

			TEL.TEL_TELEFONE 'TELEFONE',

			CAR.CAR_MARCA 'MARCA',
			CAR.CAR_MODELO 'MODELO',
			YEAR(CAR.CAR_ANO) 'ANO',
			CAR.CAR_PRECO 'VALOR'


		FROM tb_CARRO CAR
			INNER JOIN tb_CLIENTE CLI
				ON CAR.CAR_CODIGO = CLI.FK_CAR_CODIGO
			INNER JOIN tb_ENDERECO EN
				ON CLI.CLI_CODIGO = EN.FK_CLI_CODIGO
			INNER JOIN TELEFONE TEL
				ON EN.END_CODIGO = TEL.TEL_CODIGO
		
		WHERE CLI.CLI_CODIGO = @ID_CLIENTE
END 

EXEC SP_BUSCAR_CLIENTE_CARRO 6





-- EDITAR CLIENTE
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_EDITAR_CLIENTE'))
	DROP PROCEDURE SP_EDITAR_CLIENTE
GO
CREATE PROCEDURE SP_EDITAR_CLIENTE
	@ID				INT,
	@NOME			VARCHAR(50),
	@CPF			VARCHAR(30),
	@SEXO			VARCHAR(30)

AS
BEGIN

	UPDATE tb_CLIENTE SET 
							CLI_NOME = @NOME,	
							CLI_CPF = @CPF,		
							CLI_SEXO = @SEXO	
	WHERE CLI_CODIGO = @ID

END







-- EXCLUIR CLIENTE
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_EXCLUIR_CLIENTE'))
	DROP PROCEDURE SP_EXCLUIR_CLIENTE
GO
CREATE PROCEDURE SP_EXCLUIR_CLIENTE
	
	@ID				INT

AS
BEGIN
	
	DELETE FROM tb_CLIENTE WHERE CLI_CODIGO = @ID

END






-- SELECIONAR CLIENTE
IF EXISTS (SELECT * FROM SYS.objects WHERE OBJECT_ID = OBJECT_ID(N'SP_SELECIONAR_CLIENTE'))
	DROP PROCEDURE SP_SELECIONAR_CLIENTE
GO
CREATE PROCEDURE SP_SELECIONAR_CLIENTE
	
AS
BEGIN
	
	SELECT * FROM tb_CLIENTE

END