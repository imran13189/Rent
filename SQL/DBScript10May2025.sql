USE [Rent]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cities](
	[city_id] [int] NULL,
	[city_name] [varchar](255) NULL,
	[state_id] [int] NULL,
	[state_name] [varchar](255) NULL
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[LocationId] [int] IDENTITY(1,1) NOT NULL,
	[LocationName] [nvarchar](max) NULL,
	[Long] [float] NULL,
	[Lat] [float] NULL,
	[CityId] [int] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Master_Furnished](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Furnished] [varchar](50) NULL,
 CONSTRAINT [PK_Master_Furnished] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Message] [varchar](100) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[Created] [datetime] NOT NULL,
	[SentTo] [bigint] NOT NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Property](
	[PropertyId] [bigint] IDENTITY(1,1) NOT NULL,
	[LocationId] [int] NULL,
	[PropertyTypeId] [smallint] NULL,
	[RentAmount] [decimal](18, 2) NULL,
	[SecurityAmount] [decimal](18, 2) NULL,
	[IsFurnished] [tinyint] NULL,
	[Bathrooms] [tinyint] NULL,
	[Parking] [tinyint] NULL,
	[Description] [varchar](200) NULL,
	[AvailableFrom] [datetime] NULL,
	[AvailableFor] [tinyint] NULL,
	[Area] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[UserId] [bigint] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK_Property] PRIMARY KEY CLUSTERED 
(
	[PropertyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PropertyType](
	[PropertyTypeId] [int] IDENTITY(1,1) NOT NULL,
	[PropertyType] [varchar](50) NULL,
 CONSTRAINT [PK_PropertyType] PRIMARY KEY CLUSTERED 
(
	[PropertyTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Mobile] [varchar](20) NULL,
	[Email] [varchar](255) NULL,
	[UserName] [varchar](255) NULL,
	[Password] [varchar](50) NULL,
	[ZipCode] [varchar](50) NULL,
	[CityId] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[IsActive] [bit] NULL,
	[RoleId] [int] NULL,
	[OTP] [varchar](5) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WishList](
	[PropertyId] [bigint] NOT NULL,
	[UserId] [bigint] NOT NULL,
	[CreatedDate] [datetime] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Locations] ADD  CONSTRAINT [DF_Locations_CreateDate]  DEFAULT (getutcdate()) FOR [CreateDate]
GO
ALTER TABLE [dbo].[Messages] ADD  CONSTRAINT [DF_Message_Created]  DEFAULT (getutcdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Property] ADD  CONSTRAINT [DF_Property_CreatedDate]  DEFAULT (getutcdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedDate]  DEFAULT (getutcdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WishList] ADD  CONSTRAINT [DF_WishList_CreatedDate]  DEFAULT (getutcdate()) FOR [CreatedDate]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Script for SelectTopNRows command from SSMS  ******/
CREATE proc [dbo].[SP_GetAllStates]
as
begin

SELECT TOP (1000) [city_id]
      ,[city_name]
      ,[state_id]
      ,[state_name]
  FROM [Rent].[dbo].[Cities] 

  end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GetCities]
as
begin

	SELECT (
		ISNULL((
					select 
						city_name,state_id,city_id,
						(select TOP 1 Lat from Locations L where CityId=C.city_id) as Lat,
						(select TOP 1 Long from Locations L where CityId=C.city_id) as Long
					
					from Cities C
					FOR JSON auto
					),'[]')
			
			) AS json

end

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Script for SelectTopNRows command from SSMS  ******/

-- [SP_GetLocations] 'Dehradun'

CREATE proc [dbo].[SP_GetLocations] --'Dehradun'
(
	@Search varchar(50)=null,
	@Lat FLOAT = null
	,@Long FLOAT = null
)
as
begin
		SELECT (
		ISNULL((
					select distinct LocationId,LocationName,CAST(Long AS DECIMAL(15,10)) as Long,CAST(Lat AS DECIMAL(15, 10)) as Lat
					FROM Locations 
					WHERE (LocationName like '%'+@Search+'%')
					AND ((@Lat is null) OR(@Lat is not null and Long >= (@Long - 2)AND Long <= (@Long + 2)))
					
					
					order by LocationName asc
					FOR JSON auto
					),'[]')
			
			) AS json
end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GetMessage]  ---'hello'
(
	
	@UserId bigint
)
as
begin



SELECT (
		ISNULL((
					select [Message],UserId, FORMAT(Created, 'dd MMMM') as CreatedDate,FORMAT(Created, 'H:mm tt') as Time from Messages where SentTo=@UserId order by Created desc
					FOR JSON auto
					),'[]')
			
			) AS json
		   

end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- [dbo].[SP_GetProperties] null,null,'Morowala Clementown Dehradun',null,null,0
CREATE PROC [dbo].[SP_GetProperties] (
	@Lat FLOAT = NULL
	,@Long FLOAT = NULL
	,@Location VARCHAR(max) = NULL
	,@ptype INT = NULL
	,@budget INT = NULL
	,@page INT = 0
	)
AS
BEGIN
	DECLARE @pageLength INT = 20;

	WITH CTE
	AS (
		SELECT ROW_NUMBER() OVER (
				ORDER BY PropertyId
				) AS RowNum
			,[PropertyId]
			,UserId
			,CASE 
				WHEN [PropertyTypeId] = 10
					THEN '1BHK'
				WHEN [PropertyTypeId] = 20
					THEN '2BHK'
				ELSE '3BHK'
				END AS PropertyType
			,[PropertyTypeId]
			,[RentAmount]
			,ISNull(F.Furnished, 'Not Furnished') AS [IsFurnished]
			,[Bathrooms]
			,[Parking]
			,[Description]
			,CONVERT(VARCHAR, AvailableFrom, 107) AS AvailableFrom
			--,date_format(AvailableFrom,'%M %d %u') as AvailableFrom
			,[CreatedDate]
			,[ModifiedDate]
			,[LocationName]
			,[Long]
			,[Lat]
			,[CityId]
			,Area
			,[AvailableFor]
			,[SecurityAmount]
			--,'https://storage.googleapis.com/rent-buck/rentstorage/'+cast(P.PropertyId as varchar)+'/0.jpg' as filePath
			,'/Files/' + cast(P.PropertyId AS VARCHAR) + '/0.jpg' AS filePath
			,'/propertyforrent/' + REPLACE(Description, ' ', '-') + '-' + REPLACE(REPLACE(LocationName, ', ', '-'), ' ', '-') + '/' + cast(P.PropertyId AS VARCHAR) AS PropertyUrl
		FROM [dbo].[Property] P
		LEFT JOIN Locations l ON p.LocationId = l.LocationId
		LEFT JOIN Master_Furnished F ON p.IsFurnished = F.Id
		WHERE (
				(
					@Lat IS NULL
					AND @Long IS NULL
					)
				OR (
					l.Lat >= (@Lat - 2)
					AND l.Lat <= (@Lat + 2)
					)
				AND (
					l.Long >= (@Long - 2)
					AND l.Long <= (@Long + 2)
					)
				)
			AND (
				(@Location IS NULL)
				OR (
					@Location IS NOT NULL
					AND l.LocationName LIKE '%' + @Location + '%'
					)
				)
			AND (
				(@ptype IS NULL or @ptype=0)
				OR (
					@ptype IS NOT NULL
					AND p.PropertyTypeId = @ptype
					)
				)
			AND (
				(@budget IS NULL)
				OR (
					@budget IS NOT NULL
					AND p.RentAmount <= @budget
					)
				)
		)
	SELECT *
	FROM CTE
	WHERE RowNum > (@page * @pageLength)
		AND RowNum <= ((@page * @pageLength) + @pageLength)
	ORDER BY CreatedDate DESC
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GetProperty] 
(
	@PropertyId bigint
)
as
begin

	select 
	[PropertyId]
			,CASE 
				WHEN [PropertyTypeId] = 10
					THEN '1BHK'
				WHEN [PropertyTypeId] = 20
					THEN '2BHK'
				ELSE '3BHK'
				END AS PropertyType
			,[PropertyTypeId]
			,[RentAmount]
			,ISNull(F.Furnished,'Not Furnished') as [IsFurnished]
			,ISNull([Bathrooms],1) as [Bathrooms]
			,CASE WHEN [Parking]=1 THEN 'CAR' ELSE 'Bike' END as Parking
			,CASE WHEN AvailableFor=1 THEN 'Only Family' ELSE 'All' END as AvailableFor
			,[Description]
			,CONVERT(VARCHAR, AvailableFrom, 107) AS AvailableFrom
			--,date_format(AvailableFrom,'%M %d %u') as AvailableFrom
			,[CreatedDate]
			,[ModifiedDate]
			,[LocationName]
			,[Long]
			,[Lat]
			,[CityId]
			,Area
			,P.UserId
			,P.Parking as ParkingId
			,P.IsFurnished as FurnishedId
			,P.AvailableFor as AvailableForId
			,P.SecurityAmount
			,P.LocationId
			,P.UserId
	FROM [dbo].[Property] P
		LEFT JOIN Locations l ON p.LocationId = l.LocationId
		LEFT JOIN Master_Furnished F on p.IsFurnished=F.Id
where P.PropertyId=@PropertyId
end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_GetUser] 
(
@UserId bigint
)
as
begin

select UserId,Name,Mobile,Email from Users where UserId=@UserId FOR JSON PATH, WITHOUT_ARRAY_WRAPPER;

end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- [SP_GetWishList] 4
CREATE PROCEDURE [dbo].[SP_GetUserProperties] (@UserId BIGINT,@page INT = 0)

AS
BEGIN
	-- Select PropertyId and UserId from WishList table for the given UserId

	DECLARE @pageLength INT = 20;

	WITH CTE
	AS (

	SELECT ROW_NUMBER() OVER (
				ORDER BY ModifiedDate
				) AS RowNum
				,p.[PropertyId]
			,p.UserId
			,CASE 
				WHEN [PropertyTypeId] = 10
					THEN '1BHK'
				WHEN [PropertyTypeId] = 20
					THEN '2BHK'
				ELSE '3BHK'
				END AS PropertyType
			,[PropertyTypeId]
			,[RentAmount]
			,ISNull(F.Furnished, 'Not Furnished') AS [IsFurnished]
			,[Bathrooms]
			,[Parking]
			,[Description]
			,CONVERT(VARCHAR, AvailableFrom, 107) AS AvailableFrom
			--,date_format(AvailableFrom,'%M %d %u') as AvailableFrom
			,p.[CreatedDate]
			,[ModifiedDate]
			,[LocationName]
			,[Long]
			,[Lat]
			,[CityId]
			,Area
			,[AvailableFor]
			,[SecurityAmount]
			--,'https://storage.googleapis.com/rent-buck/rentstorage/'+cast(P.PropertyId as varchar)+'/0.jpg' as filePath
			,'/Files/' + cast(P.PropertyId AS VARCHAR) + '/0.jpg?v='+cast(RAND() as varchar) AS filePath
			,'/propertyforrent/' + REPLACE(Description, ' ', '-') + '-' + REPLACE(REPLACE(LocationName, ', ', '-'), ' ', '-') + '/' + cast(P.PropertyId AS VARCHAR) AS PropertyUrl

	FROM  Property p 
		LEFT JOIN Locations l ON p.LocationId = l.LocationId
		LEFT JOIN Master_Furnished F ON p.IsFurnished = F.Id
	WHERE p.UserId = @UserId
	)

	SELECT *
	FROM CTE
	WHERE RowNum > (@page * @pageLength)
		AND RowNum <= ((@page * @pageLength) + @pageLength)
	ORDER BY CreatedDate DESC

END;
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create proc [dbo].[SP_GetUsers]
as
begin

	select 
	U.[UserId]
      ,U.[Name]
      ,U.[Mobile]
      ,U.[Email]
      ,U.Name as [UserName]
      ,U.[Password]
      ,U.[ZipCode]
      ,U.[City]
      ,U.[CreatedDate]
      ,U.[ModifiedDate]
      ,U.[IsActive]
      ,U.[RoleId]
      ,U.[Token]
	  ,R.RoleName
	  ,mgr.Name as ManagerName
	  ,mgr.ManagerId
	  ,S.StateName
	  ,U.StateId
	from Users U join Roles R on U.RoleId=R.RoleId
	left join States S on U.StateId=S.StateId
	left join Users mgr on U.ManagerId=mgr.UserId 

end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- [SP_GetWishList] 4
CREATE PROCEDURE [dbo].[SP_GetWishList] (@UserId BIGINT)
AS
BEGIN
	-- Select PropertyId and UserId from WishList table for the given UserId
	SELECT p.[PropertyId]
			,W.UserId
			,CASE 
				WHEN [PropertyTypeId] = 10
					THEN '1BHK'
				WHEN [PropertyTypeId] = 20
					THEN '2BHK'
				ELSE '3BHK'
				END AS PropertyType
			,[PropertyTypeId]
			,[RentAmount]
			,ISNull(F.Furnished, 'Not Furnished') AS [IsFurnished]
			,[Bathrooms]
			,[Parking]
			,[Description]
			,CONVERT(VARCHAR, AvailableFrom, 107) AS AvailableFrom
			--,date_format(AvailableFrom,'%M %d %u') as AvailableFrom
			,p.[CreatedDate]
			,[ModifiedDate]
			,[LocationName]
			,[Long]
			,[Lat]
			,[CityId]
			,Area
			,[AvailableFor]
			,[SecurityAmount]
			--,'https://storage.googleapis.com/rent-buck/rentstorage/'+cast(P.PropertyId as varchar)+'/0.jpg' as filePath
			,'/Files/' + cast(P.PropertyId AS VARCHAR) + '/0.jpg' AS filePath
			,'/propertyforrent/' + REPLACE(Description, ' ', '-') + '-' + REPLACE(REPLACE(LocationName, ', ', '-'), ' ', '-') + '/' + cast(P.PropertyId AS VARCHAR) AS PropertyUrl
		,W.UserId
	FROM WishList W
	JOIN Property p ON W.PropertyId = p.PropertyId
		LEFT JOIN Locations l ON p.LocationId = l.LocationId
		LEFT JOIN Master_Furnished F ON p.IsFurnished = F.Id
	WHERE W.UserId = @UserId;
END;
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- [dbo].[SP_LocationSearch] 30.2793989178102,78.0080578578974
CREATE PROC [dbo].[SP_LocationSearch] 
	(
	@Lat FLOAT = NULL
	,@Long FLOAT = NULL
	)
AS
BEGIN
	
					SELECT  MAX(LocationId) as LocationId
						,MAX(LocationName) as LocationName
						,CAST(MAX(Long) AS DECIMAL(15, 10)) AS Long
						,CAST(MAX(Lat) AS DECIMAL(15, 10)) AS Lat
					FROM Locations
					WHERE 
						 (
							(@Lat IS NULL)
							OR (
								@Lat IS NOT NULL
								AND Lat >= (@Lat - 1)
								AND Lat <= (@Lat + 1)
								)
							)
						AND
						 (
							(@Long IS NULL)
							OR (
								@Long IS NOT NULL
								AND Long >= (@Long - 1)
								AND Long <= (@Long + 1)
								)
							)

							group by LocationName
					
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- SP_SaveLocation  0,'Majra Dehradun','77.99803742004717','30.290793941474035',506
CREATE proc [dbo].[SP_SaveLocation] 
(
@LocationId int=null,
			@LocationName nvarchar(MAX) =null,
           @Long float =null,
           @Lat float =null,
           @CityId int =null
        
)

as
begin

declare @Location varchar(max)=null;
declare @LId bigint=null;

select TOP 1 @Location=LocationName,@LId=LocationId from Locations where LocationName=@LocationName;



if @LId is null
BEGIN

INSERT INTO [dbo].[Locations]
           ([LocationName]
           ,[Long]
           ,[Lat]
           ,[CityId]
           )
     VALUES
           (@LocationName
           , @Long
           ,@Lat
           ,@CityId
           )

		   select SCOPE_IDENTITY() as Id,'New';

END
ELSE
BEGIN

	select @LId as Id,'Exist';

END
end


GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_SaveMessage] ---'hello'
(
	@Message varchar(100),
	@UserId bigint,
	@SentTo bigint
)
as
begin

INSERT INTO [dbo].[Messages]
           ([Message]
		   ,UserId
		   ,SentTo
           )
     VALUES
           (@Message
		   ,@UserId
		   ,@SentTo
		   )

		   
			SELECT 'Sent Successfully' AS [Message]
				,@@IDENTITY AS Id
			
				,1 AS IsSuccess;

end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SP_SaveProperty] (
	@PropertyId BIGINT
	,@LocationId INT = NULL
	,@PropertyTypeId SMALLINT = NULL
	,@RentAmount DECIMAL(18, 2) = NULL
	,@SecurityAmount DECIMAL(18, 2) = NULL
	,@IsFurnished TINYINT = NULL
	,@AvailableFor TINYINT = NULL
	,@Bathrooms TINYINT = NULL
	,@Parking TINYINT = NULL
	,@Description VARCHAR(200) = NULL
	,@AvailableFrom DATETIME = NULL
	,@Area INT = NULL
	,@UserId BIGINT
	)
AS
BEGIN
	IF @PropertyId > 0
	BEGIN
		UPDATE [dbo].[Property]
		SET LocationId = @LocationId
			,PropertyTypeId = @PropertyTypeId
			,RentAmount = @RentAmount
			,IsFurnished = @IsFurnished
			,Bathrooms = @Bathrooms
			,Parking = @Parking
			,Description = @Description
			,AvailableFrom = @AvailableFrom
			,Area = @Area
			,AvailableFor = @AvailableFor
			,SecurityAmount = @SecurityAmount
			,ModifiedDate=GETUTCDATE()
		WHERE PropertyId = @PropertyId;-- Ensure you pass the correct identifier

		SELECT @PropertyId AS Id
			,'Updated successfully';
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Property] (
			[LocationId]
			,[PropertyTypeId]
			,[RentAmount]
			,[IsFurnished]
			,[Bathrooms]
			,[Parking]
			,[Description]
			,[AvailableFrom]
			,Area
			,[IsActive]
			,[IsDeleted]
			,[UserId]
			,[AvailableFor]
			,[SecurityAmount]
			,ModifiedDate
			)
		VALUES (
			@LocationId
			,@PropertyTypeId
			,@RentAmount
			,@IsFurnished
			,@Bathrooms
			,@Parking
			,@Description
			,@AvailableFrom
			,@Area
			,1
			,0
			,@UserId
			,@AvailableFor
			,@SecurityAmount
			,GETUTCDATE()
			);

		SELECT @@IDENTITY AS Id
			,'';
	END
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- SP_SaveUser 0,'','7830831831'
CREATE PROC [dbo].[SP_SaveUser] (
	@UserId BIGINT = NULL
	,@Name VARCHAR(255) = NULL
	,@Mobile VARCHAR(255) = NULL
	,@Email VARCHAR(255) = NULL
	,@Zipcode VARCHAR(255) = NULL
	,@CityId int = NULL
	,@Password VARCHAR(255) = NULL
	)
AS
BEGIN
	DECLARE @mob VARCHAR(20) = NULL

	IF @UserId = 0
	BEGIN
		SELECT TOP 1 @mob = mobile
		FROM Users
		WHERE Mobile = @Mobile;

		IF @mob IS NULL
		BEGIN
			DECLARE @OTP INT = NULL;

			SET @OTP = LEFT(CAST(RAND() * 1000000000 AS INT), 4);

			INSERT INTO [dbo].[Users] (
				[Name]
				,[Mobile]
				,[Email]
				,[ZipCode]
				,[CityId]
				,[CreatedDate]
				,[ModifiedDate]
				,[IsActive]
				,[RoleId]
				,OTP
				)
			VALUES (
				@Name
				,@Mobile
				,@Email
				,@Zipcode
				,@CityId
				,getutcdate()
				,getutcdate()
				,1
				,1
				,@OTP
				);

			SELECT 'Saved Successfully' AS [Message]
				,@@IDENTITY AS Id
				,@OTP AS OTP
				,1 AS IsSuccess;
		END
		ELSE
		BEGIN
			SET @OTP = LEFT(CAST(RAND() * 1000000000 AS INT), 4);

			UPDATE Users
			SET OTP = @OTP
			WHERE Mobile = @Mobile;

			SELECT 'Mobile already register' AS Message
				,@OTP AS OTP
				,1 AS IsSuccess;
		END
	END
	ELSE
	BEGIN
		UPDATE [dbo].[Users]
		SET [Name] = @Name
			,[Mobile] = @Mobile
			,[Email] = @Email
			,[ZipCode] = @Zipcode
			,[Password] = @Password
			,[ModifiedDate] = getutcdate()
			,CityId=@CityId
		WHERE UserId = @UserId

		--SELECT 'Updated Successfully' AS [Message]
		--	,@UserId AS Id
		--	,1 AS IsSuccess;
		DECLARE @ver INT = NULL;

			SET @ver = LEFT(CAST(RAND() * 1000000000 AS INT), 4);

		SELECT UserId
			,[Name]
			,[Mobile]
			,[Email]
			,[UserName]
			,[Password]
			,[ZipCode]
			,[CityId]
			,c.city_name
			,[IsActive]
			,[RoleId]
			,city_name 
			,'http://localhost/Files/Profile/' + cast(Mobile AS VARCHAR) + '.jpg?v='+cast(@ver as varchar)  AS ImagePath
		FROM [Rent].[dbo].[Users] U left join Cities C on U.CityId=C.city_id 
		WHERE UserId = @UserId
	END
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SaveWishList]
(
    @PropertyId BIGINT,
    @UserId BIGINT
)
AS
BEGIN
    -- Check if the entry already exists in the WishList
    IF EXISTS (
        SELECT 1
        FROM [WishList]
        WHERE [PropertyId] = @PropertyId AND [UserId] = @UserId
    )
    BEGIN
        -- If the entry exists, delete it
        DELETE FROM [WishList]
        WHERE [PropertyId] = @PropertyId AND [UserId] = @UserId;

				SELECT 'Successfully deleted' AS Message
				
				,1 AS IsSuccess;
    END
    ELSE
    BEGIN
        -- If the entry does not exist, insert it
        INSERT INTO [dbo].[WishList] ([PropertyId], [UserId])
        VALUES (@PropertyId, @UserId);

			SELECT 'Successfully updated' AS Message
				
				,1 AS IsSuccess;
    END
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[SP_UpdateProperty]
(
@PropertyId bigint,
	@LocationId int = NULL,
	@PropertyTypeId smallint=  NULL,
	@RentAmount decimal (18, 2) =NULL,
	@SecurityAmount decimal (18, 2) =NULL,
	@IsFurnished tinyint=  NULL,
	@AvailableFor tinyint=  NULL,
	@Bathrooms tinyint = NULL,
	@Parking tinyint = NULL,
	@Description varchar (200)= NULL,
	@AvailableFrom datetime = NULL,
	@Area int =null,
	@UserId bigint
)
as
begin
UPDATE [dbo].[Property]
SET 
    LocationId = @LocationId,
    PropertyTypeId = @PropertyTypeId,
    RentAmount = @RentAmount,
    IsFurnished = @IsFurnished,
    Bathrooms = @Bathrooms,
    Parking = @Parking,
    Description = @Description,
    AvailableFrom = @AvailableFrom,
    Area = @Area,
    IsActive = 1, -- Assuming you always want it active
    IsDeleted = 0, -- Assuming it's never deleted in update
    UserId = @UserId,
    AvailableFor = @AvailableFor,
    SecurityAmount = @SecurityAmount
WHERE PropertyId = @PropertyId; -- Ensure you pass the correct identifier

  select @PropertyId as Id,'Updated successfully';

end
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SP_ValidateOTP] (
	@Mobile VARCHAR(20)
	,@OTP VARCHAR(4)
	)
AS
BEGIN
	SELECT TOP 1 UserId
		,[Name]
		,[Mobile]
		,[Email]
		,[UserName]
		,[Password]
		,[ZipCode]
		,c.city_name
		,[CityId]
		,[IsActive]
		,[RoleId]
		,'http://localhost/Files/Profile/' + cast(Mobile AS VARCHAR) + '.jpg' AS ImagePath
	FROM Users  U left join Cities C on U.CityId=C.city_id 
	WHERE Mobile = @Mobile
		AND OTP = @OTP
END
GO
